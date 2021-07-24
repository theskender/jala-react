import React, {useState} from 'react';
import Modal from "./Modal";
import {LOCAL_STORAGE_SERVICE_DATA} from "../constants/localStorage";
import TasksList from "./TasksList";

const initProjectData = {
  projectName: '',
  tasks: [],
  notes: '',
}

const ProjectsList = ({ projectsList, setProjectsList, labels }) => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
    setProject(initProjectData);
    setProjectId();
  }
  const openModal = () => setOpen(true);

  const [project, setProject] = useState(initProjectData);
  const [projectId, setProjectId] = useState();
  const [projectIdToDelete, setProjectIdToDelete] = useState();

  const onChange = (e) => {
    const {name, value} = e.target;
    setProject({
      ...project,
      [name]: value,
    });
  }

  const setTasks = (tasks) => setProject({ ...project, tasks });

  const getProjectId  = () => {
    const serviceData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SERVICE_DATA));
    serviceData.projectsIdCounter++;
    localStorage.setItem(LOCAL_STORAGE_SERVICE_DATA, JSON.stringify(serviceData));
    return `pro${serviceData.projectsIdCounter}`;
  }

  const onSubmit = () => {
    const key = projectId || getProjectId();
    setProjectsList({
      ...projectsList,
      [key]: project,
    });

    closeModal();
  }

  const openProject = (id) => {
    setProject(projectsList[id]);
    setProjectId(id);
    setOpen(true);
  }

  const deleteProject = (e, id) => {
    e.stopPropagation();
    setProjectIdToDelete(id);
    setTimeout(
      () => {
        const newProjects = Object.assign({}, projectsList);
        delete newProjects[id];
        setProjectsList(newProjects);
        setProjectIdToDelete();
        window.alert(`Projekt s ID-em: ${id} uspješno je izbrisan!`);
      },
      500,
    )
  }

  return (
    <>
      <div className="top-bar top-bar-projects">
        <h2 className="top-bar__name">Projekti</h2>
        <i
          className="fa fa-plus-square top-bar__add-new new-project clickable"
          id="btn-add-project"
          aria-hidden="true"
          onClick={openModal}
        />
      </div>
      {/*Projects container, dynamically fills with task cards*/}
      <div className="task-card-container" id="projects-container">
        {Object.entries(projectsList).map(([id, project]) => {
          let backgroundColor;
          const finishedTasks = project.tasks.filter((t) => t.checked);
          if (finishedTasks.length === project.tasks.length) {
            backgroundColor = 'green';
          } else if (finishedTasks.length > 0) {
            backgroundColor = 'yellow';
          }

          const width = (finishedTasks.length / project.tasks.length) * 100 + '%';

          return (
            <div
              key={id}
              id={id}
              className={`task-card task-card-project${projectIdToDelete === id ? ' task-card-deletion' : ''}`}
              onClick={() => openProject(id)}
            >
              <div className="task-card__delete-container">
                <i onClick={(e) => deleteProject(e, id)} className="fa fa-times task-card__delete" aria-hidden="true" />
              </div>
              <h3 className="task-card__header project-header">{project.projectName}</h3>
              <div className="task-card__progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width, backgroundColor }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal isOpen={open} closeModal={closeModal}>
        <div>
          <div className="modal__header">
            <div className="modal__header-title" id="modal__header-title-project">
              {projectId ? 'Ažuriranje projekta' : 'Novi projekt'}
            </div>
            <i className="fa fa-times modal__close" aria-hidden="true" onClick={closeModal} />
          </div>
          <div className="modal__content" id="modal__content-project">
            <form autoComplete="off" id="newprojectname" name="newprojectname">
              <fieldset>
                <legend id="project-legend" >
                  {project.projectName || 'Novi projekt'}
                </legend>
                <div className="lbl-inp-pair">
                  <label htmlFor="projectName">Ime projekta:</label>
                  <input
                    value={project.projectName}
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
            <TasksList tasks={project.tasks} setTasks={setTasks} labels={labels} />
            <form autoComplete="off" id="tasks" name="tasks">
              <fieldset>
                <legend>Bilješke</legend>
                <div className="lbl-txt-pair">
                  <label htmlFor="notes">Bilješke o projektu:</label>
                  <textarea
                    value={project.notes}
                    onChange={onChange}
                    id="notes"
                    name="notes"
                    placeholder="..."
                  />
                </div>
              </fieldset>
            </form>
            <div className="form-btn-container">
              <button className="form-btn" type="reset" id="project-save-btn" onClick={onSubmit}>
                Spremi
              </button>
              <button className="form-btn" type="reset" id="project-cancel-btn" onClick={closeModal}>
                Odustani
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default ProjectsList;
