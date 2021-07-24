import Header from "./components/Header";
import {useEffect, useState} from "react";
import {
  initServiceData, initUserData, LOCAL_STORAGE_DAYS_DATA,
  LOCAL_STORAGE_PROJECTS_DATA,
  LOCAL_STORAGE_SERVICE_DATA,
  LOCAL_STORAGE_USER_DATA
} from "./constants/localStorage";
import ProjectsList from "./components/ProjectsList";
import DaysList from "./components/DaysList";

const loadUserData = () => {
  const userData = localStorage.getItem(LOCAL_STORAGE_USER_DATA);
  if (userData) {
    const a = Object.assign({}, initUserData, JSON.parse(userData));
    console.log(a);
    return a;
  }
  return initUserData;
}

const loadProjects = () => {
  const projectsDataString = localStorage.getItem(LOCAL_STORAGE_PROJECTS_DATA);
  if (projectsDataString) {
    const projectsData = JSON.parse(projectsDataString);
    console.log({ projectsData });
    return projectsData;
  }
  return {};
}

const loadDays = () => {
  const daysDataString = localStorage.getItem(LOCAL_STORAGE_DAYS_DATA);
  if (daysDataString) {
    const daysData =  JSON.parse(daysDataString);
    console.log({ daysData });
    return daysData;
  }
  return {};
}

function App() {
  const [userData, setUserData] = useState(() => loadUserData());
  useEffect(
    () => { localStorage.setItem(LOCAL_STORAGE_USER_DATA, JSON.stringify(userData)) },
    [userData]
  );

  const [projects, setProjects] = useState(() => loadProjects());
  useEffect(
    () => { localStorage.setItem(LOCAL_STORAGE_PROJECTS_DATA, JSON.stringify(projects)) },
    [projects]
  );

  const [days, setDays] = useState(() => loadDays());
  useEffect(
    () => { localStorage.setItem(LOCAL_STORAGE_DAYS_DATA, JSON.stringify(days)) },
    [days]
  );

  useEffect(
    () => {
      const serviceData = localStorage.getItem(LOCAL_STORAGE_SERVICE_DATA);
      if (serviceData) return;
      localStorage.setItem(LOCAL_STORAGE_SERVICE_DATA, JSON.stringify(initServiceData))
    },
    []
  );

  const resetData = () => {
    setUserData(initUserData);
    setProjects({});
    setDays({});
    localStorage.setItem(LOCAL_STORAGE_SERVICE_DATA, JSON.stringify(initServiceData));
  }

  return (
    <div className="App">
      <Header userData={userData} setUserData={setUserData} reset={resetData} />
      <div className="dummy"></div>
      <div className="main-content">
        <ProjectsList projectsList={projects} setProjectsList={setProjects} labels={userData.priorityLabels} />
        <hr className="divider-line"/>
        <DaysList daysList={days} setDaysList={setDays} labels={userData.priorityLabels} />
      </div>
      <footer>
        <p>JustAnotherListApp - Diplomski rad || Domagoj Škender 2021</p>
      </footer>
      <img className="loading-spinner hidden" src="JALA_Logo_NO_TEXT.svg" alt=""/>
    </div>
  );
}

export default App;
