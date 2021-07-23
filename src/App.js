import Header from "./components/header";
import {useEffect} from "react";
import {initServiceData, LOCAL_STORAGE_SERVICE_DATA} from "./constants/localStorage";
import Projects from "./components/projects";

function App() {

  useEffect(
    () => {
      const serviceData = localStorage.getItem(LOCAL_STORAGE_SERVICE_DATA);
      if (serviceData) return;
      localStorage.setItem(LOCAL_STORAGE_SERVICE_DATA, JSON.stringify(initServiceData))
    },
    []
  );

  return (
    <div className="App">
      <Header />
      <div className="dummy"></div>
      <div className="main-content">
        <Projects />

        <hr className="divider-line"/>

        <div className="top-bar top-bar-days">
          <h2 className="top-bar__name">Dani</h2>
          <i
              className="fa fa-plus-square top-bar__add-new new-day clickable"
              id="btn-add-day"
              aria-hidden="true"
          ></i>
        </div>
        {/*Days container, dynamically fills with task cards*/}
        <div className="task-card-container" id="days-container"></div>
      </div>
      <footer>
        <p>JustAnotherListApp - Diplomski rad || Domagoj Škender 2021</p>
      </footer>
      <div className="overlay hidden"></div>
      <img className="loading-spinner hidden" src="JALA_Logo_NO_TEXT.svg" alt=""/>





      {/*new-day modal*/}
      <div className="modal new-day-modal hidden">
        <div className="modal__header">
          <div id="modal__header-title-day" className="modal__header-title" />
          <i className="fa fa-times modal__close" aria-hidden="true" />
        </div>
        <div className="modal__content" id="modal__content-day">
          <form autoComplete="off" id="newdaydate" name="newdaydate">
            <fieldset>
              <legend id="day-legend" />
              <div className="lbl-inp-pair">
                <label htmlFor="dayDate">Datum:</label>
                <input
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
          <form autoComplete="off" id="taskinputday" name="taskinputday">
            <fieldset>
              <legend>Unos zadatka</legend>
              <div className="lbl-inp-pair">
                <label htmlFor="new-day-modal__task-text">Tekst zadatka:</label>
                <input
                    type="text"
                    name="new-day-modal__task-text"
                    id="new-day-modal__task-text"
                    placeholder="Unesi tekst zadatka..."
                    size="30"
                />
              </div>
              <p title="Labele za označavanje prioriteta/vrste zadataka.">
                Labele za zadatak
                <span className="italic">(klikni za odabrati)</span>
              </p>
              <div id="new-day-modal__label-container" className="label-container" />
              <div className="form-btn-container">
                <button
                    className="form-btn"
                    type="button"
                    id="new-day-modal__add-task-btn"
                >
                  Unesi zadatak
                </button>
              </div>
            </fieldset>
          </form>
          <form autoComplete="off" id="tasksday" name="tasksday">
            <fieldset>
              <legend>Uneseni zadaci</legend>
              <ul id="new-day-modal__tasks-container" className="modal__tasks-container" />
            </fieldset>
          </form>
          <div className="form-btn-container">
            <button className="form-btn" type="button" id="day-save-btn">
              Spremi
            </button>
            <button className="form-btn" type="reset" id="day-cancel-btn">
              Odustani
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
