import React, {useState} from 'react';

const initTask = {
  taskName: '',
  labels: [],
  checked: false,
}

const TasksList = ({tasks, setTasks, labels}) => {
  const [task, setTask] = useState(initTask);
  const onChangeTaskName = (e) => setTask({
    ...task,
    taskName: e.target.value
  })

  const addLabel = (label) => {
    const selectedLabel = task.labels.find((l) => l.id === label.id);

    if (selectedLabel) {
      const newLabels = task.labels.filter((l) => l.id !== label.id);
      setTask({
        ...task,
        labels: newLabels,
      });
      return;
    }

    setTask({
      ...task,
      labels: [...task.labels, label],
    })
  }

  const addTask = () => {
    setTasks([...tasks, task]);
    setTask(initTask);
  }

  const deleteTask = (e, task) => {
    e.stopPropagation();
    const index = tasks.indexOf(task);
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1)
    setTasks(tasksCopy);
  }

  const toggleTask = (task) => {
    const index = tasks.indexOf(task);
    // 1. Make a shallow copy of the items
    const tasksCopy = [...tasks];
    // 2. Make a shallow copy of the item you want to mutate
    const taskCopy = {...tasksCopy[index]};
    // 3. Replace the property you're intested in
    taskCopy.checked = !taskCopy.checked;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    tasksCopy[index] = taskCopy;
    // 5. Set the state to our new copy
    setTasks(tasksCopy);
  }

  return (
    <form autoComplete="off" id="taskinput" name="taskinput">
      <fieldset>
        <legend>Unos zadatka</legend>
        <div className="lbl-inp-pair">
          <label htmlFor="new-project-modal__task-text">Tekst zadatka:</label>
          <input
            value={task.taskName}
            onChange={onChangeTaskName}
            type="text"
            name="taskName"
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
            const isActive = task.labels.map((l) => l.id).indexOf(label.id) > -1;
            return (
              <div
                key={label.id}
                onClick={() => addLabel(label)}
                className={`priority-label${isActive ? ' picked-label' : ''}`}
                id={label.id}
                style={{backgroundColor: label.color}}
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
            onClick={addTask}
          >
            Unesi zadatak
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Uneseni zadaci</legend>
        <ul id="new-project-modal__tasks-container" className="modal__tasks-container">
          {tasks.map((task, i) => (
            <li key={i} className={`modal__task${task.checked ? ' checked' : ''}`} onClick={() => toggleTask(task)}>
              {task.taskName}
              <div className="label-container">
                {task.labels.map((label) => (
                  <div key={label.id} className="priority-label" style={{backgroundColor: label.color}} id={label.id}>
                    {label.labelName}
                  </div>
                ))}
              </div>
              <span className="remove-task" onClick={(e) => deleteTask(e, task)}>x</span>
            </li>
          ))}
        </ul>
      </fieldset>
    </form>
  );
}
export default TasksList;
