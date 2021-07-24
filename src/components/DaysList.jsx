import React, {useState} from 'react';
import Modal from "./Modal";
import TasksList from "./TasksList";
import {LOCAL_STORAGE_SERVICE_DATA} from "../constants/localStorage";

const initDay = {
  date: '',
  tasks: [],
}

const DaysList = ({ daysList, setDaysList, labels }) => {
  const [open, setOpen] = useState();
  const closeModal = () => {
    setOpen(false);
    setDay(initDay);
    setDayId();
  }
  const openModal = () => setOpen(true);

  const [day, setDay] = useState(initDay);
  const [dayId, setDayId] = useState();
  const [dayIdToDelete, setDayIdToDelete] = useState();

  const onChangDate = (e) => {
    setDay({
      ...day,
      date: e.target.value,
    });
  }

  const setTasks = (tasks) => {
    setDay({
      ...day,
      tasks,
    })
  }

  const getDayId  = () => {
    const serviceData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SERVICE_DATA));
    serviceData.daysIdCounter++;
    localStorage.setItem(LOCAL_STORAGE_SERVICE_DATA, JSON.stringify(serviceData));
    return `day${serviceData.daysIdCounter}`;
  }

  const onSubmit = () => {
    const key = dayId || getDayId();
    setDaysList({
      ...daysList,
      [key]: day,
    });

    closeModal();
  }

  const openDay = (id) => {
    setDay(daysList[id]);
    setDayId(id);
    setOpen(true);
  }

  const deleteDay = (e, id) => {
    e.stopPropagation();
    setDayIdToDelete(id);
    setTimeout(
      () => {
        const newDays = Object.assign({}, daysList);
        delete newDays[id];
        setDaysList(newDays);
        window.alert(`Dan s ID-em: ${id} uspješno je izbrisan!`);
      },
      500,
    )


  }

  return (
    <>
      <div className="top-bar top-bar-days">
        <h2 className="top-bar__name">Dani</h2>
        <i
          onClick={openModal}
          className="fa fa-plus-square top-bar__add-new new-day clickable"
          id="btn-add-day"
          aria-hidden="true"
        />
      </div>
      {/*Days container, dynamically fills with task cards*/}
      <div className="task-card-container" id="days-container">
        {Object.entries(daysList).map(([id, day]) => {
          return (
            <div
              key={id}
              className={`task-card task-card-day${dayIdToDelete === id ? ' task-card-deletion' : ''}`}
              id={id}
              onClick={() => openDay(id)}
            >
              <div className="task-card__delete-container">
                <i
                  onClick={(e) => deleteDay(e, id)}
                  className="fa fa-times task-card__delete"
                  aria-hidden="true"
                />
              </div>
              <h3 className="task-card__header day-header">{day.date}</h3>
              <div className="task-card__tasks-preview-container">
                <ul className="tasks-preview">
                  {day.tasks.map((task, index) => (
                    <li className={task.checked ? 'crossed-out' : ''} key={`day_task_${index}`}>
                      {task.taskName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
      {/*new-day modal*/}
      <Modal isOpen={open} closeModal={closeModal}>
        <div className="modal__header">
          <div id="modal__header-title-day" className="modal__header-title">
            {dayId ? 'Ažuriranje data' : 'Novi dan'}
          </div>
          <i className="fa fa-times modal__close" aria-hidden="true" onClick={closeModal} />
        </div>
        <div className="modal__content" id="modal__content-day">
          <form autoComplete="off" id="newdaydate" name="newdaydate">
            <fieldset>
              <legend id="day-legend"/>
              <div className="lbl-inp-pair">
                <label htmlFor="dayDate">Datum:</label>
                <input
                  value={day.date}
                  onChange={onChangDate}
                  type="date"
                  name="dayDate"
                  id="dayDate"
                  size="30"
                  min="1980-01-01"
                  step="1"
                />
              </div>
            </fieldset>
          </form>
          <TasksList tasks={day.tasks} setTasks={setTasks} labels={labels} />
          <div className="form-btn-container">
            <button className="form-btn" type="button" id="day-save-btn" onClick={onSubmit}>
              Spremi
            </button>
            <button className="form-btn" type="reset" id="day-cancel-btn" onClick={closeModal}>
              Odustani
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default DaysList;
