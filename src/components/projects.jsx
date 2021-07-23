import React, {useState} from 'react';
import Modal from "./modal";
import {LOCAL_STORAGE_USER_DATA} from "../constants/localStorage";

const loadLabels = () => {
  const userDataString = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    return userData.priorityLabels;
  }
  return [];
}

const Projects = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(open => !open);

  const [labels, setLabels] = useState(() => loadLabels())
  const [form, setForm] = useState({
    projectName: '',
  });

  const [taskForm, setTaskForm] = useState({
    task: '',
    labels: [],
  })

  const addLabel = (label) => {
    const { labels } = taskForm;
    const selectedLabel = labels.find((l) => l.id === label.id);

    if (selectedLabel) {
      const newLabels = labels.filter((l) => l.id !== label.id);
      setTaskForm({
        ...taskForm,
        labels: newLabels,
      });
      return;
    }

    setTaskForm({
      ...taskForm,
      labels: [...taskForm.labels, label],
    })
  }

  const onChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  return (
    <>
      <div className="top-bar top-bar-projects">
        <h2 className="top-bar__name">Projekti</h2>
        <i
          className="fa fa-plus-square top-bar__add-new new-project clickable"
          id="btn-add-project"
          aria-hidden="true"
          onClick={toggleModal}
        />
      </div>
      {/*Projects container, dynamically fills with task cards*/}
      <div className="task-card-container" id="projects-container"></div>
      <Modal open={open} setOpen={setOpen}>
        <div>
          <div className="modal__header">
            <div className="modal__header-title" id="modal__header-title-project">
              {form.projectName}
            </div>
            <i className="fa fa-times modal__close" aria-hidden="true" onClick={toggleModal} />
          </div>
          <div className="modal__content" id="modal__content-project">
            <form autoComplete="off" id="newprojectname" name="newprojectname">
              <fieldset>
                <legend id="project-legend" ></legend>
                <div className="lbl-inp-pair">
                  <label htmlFor="projectName">Ime projekta:</label>
                  <input
                    value={form.projectName}
                    onChange={onChange}
                    type="text"
                    name="projectName"
                    id="projectName"
                    placeholder="Unesi ime projekta..."
                    size="30"
                    maxLength="50"
                  />
                </div>
              </fieldset>
            </form>
            <form autoComplete="off" id="taskinput" name="taskinput">
              <fieldset>
                <legend>Unos zadatka</legend>
                <div className="lbl-inp-pair">
                  <label htmlFor="new-project-modal__task-text">Tekst zadatka:</label>
                  <input
                    type="text"
                    name="task"
                    id="new-project-modal__task-text"
                    placeholder="Unesi tekst zadatka..."
                    size="30"
                  />
                </div>
                <p title="Labele za označavanje prioriteta/vrste zadataka.">
                  Labele za zadatak
                  <span className="italic">(klikni za odabrati)</span>
                </p>
                <div id="new-project-modal__label-container" className="label-container">
                  {labels.map((label) => {
                    const isActive = taskForm.labels.indexOf(label) > -1;
                    return (
                      <div
                        key={label.id}
                        onClick={(label) => addLabel(label)}
                        className={`priority-label${isActive ? ' picked-label' : ''}`}
                        id={label.id}
                        style={{ backgroundColor: label.color}}
                      >
                        {label.labelName}
                      </div>
                    );
                  })}
                </div>
                <div className="form-btn-container">
                  <button
                    className="form-btn"
                    type="button"
                    id="new-project-modal__add-task-btn"
                  >
                    Unesi zadatak
                  </button>
                </div>
              </fieldset>
            </form>
            <form autoComplete="off" id="tasks" name="tasks">
              <fieldset>
                <legend>Uneseni zadaci</legend>
                <ul id="new-project-modal__tasks-container" className="modal__tasks-container"/>
              </fieldset>
              <fieldset>
                <legend>Bilješke</legend>
                <div className="lbl-txt-pair">
                  <label htmlFor="notes">Bilješke o projektu:</label>
                  <textarea id="notes" name="notes" placeholder="..." />
                </div>
              </fieldset>
            </form>
            <div className="form-btn-container">
              <button className="form-btn" type="reset" id="project-save-btn">
                Spremi
              </button>
              <button className="form-btn" type="reset" id="project-cancel-btn">
                Odustani
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default Projects;