import React, {useEffect, useState} from 'react';
import {
  initLabelData,
  LOCAL_STORAGE_SERVICE_DATA,
} from "../constants/localStorage";
import Modal from "./Modal";

const Header = ({ userData, setUserData, reset }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(open => !open);

  const [form, setForm] = useState(userData);
  useEffect(
    () => { setForm(userData); },
    [userData]
  );

  const [labelForm, setLabelForm] = useState(initLabelData);

  const onChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const onChangeLabel = (e) => {
    const {name, value} = e.target;
    setLabelForm({
      ...labelForm,
      [name]: value,
    });
  }

  const getLabelId  = () => {
    const serviceData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SERVICE_DATA));
    serviceData.labelIdCounter++;
    localStorage.setItem(LOCAL_STORAGE_SERVICE_DATA, JSON.stringify(serviceData));
    return `lbl${serviceData.labelIdCounter}`;
  }

  const addLabel = () => {
    const id = getLabelId();
    const newLabel = { id, ...labelForm };
    setForm((prevForm) => {
      const { priorityLabels } = prevForm;
      return {
        ...prevForm,
        priorityLabels: [...priorityLabels, newLabel],
      }
    })
    setLabelForm(initLabelData);
  }

  const removeLabel = (label) => {
    const newPriorityLabels = form.priorityLabels.filter((l) => l.id !== label.id);
    setForm({
      ...form,
      priorityLabels: newPriorityLabels,
    });
  }

  const onSubmit = () => {
    setUserData(form);
    setOpen(false);
  }

  const onReset = () => {
    if (window.confirm('Jeste li sigurni?')) {
      reset();
      window.alert('Baza očišćena!');
      setOpen(false);
    }
  }

  return (
    <>
      <header>
        <img className="header-logo" src="JALA-Logo-NO-TEXT.ico" alt=""/>
        <h1 className="header-title">JALA</h1>
        <div className="header-user-info">
          <h2 className="header-user-name">
            {userData.firstName}
          </h2>
          <img
            onClick={toggleModal}
            className="header-user-pic clickable"
            src={userData.profilePicUrl || 'JALA-Logo-NO-TEXT b&w.svg'}
            alt=""
          />
        </div>
      </header>
      {/*admin modal*/}
      <Modal isOpen={open} closeModal={() => setOpen(false)}>
        <div>
          <div className="modal__header">
            <div className="modal__header-title">Administracija</div>
            <i onClick={toggleModal} className="fa fa-times modal__close" aria-hidden="true"/>
          </div>
          <div className="modal__content">
            <form autoComplete="off" id="admin" name="admin">
              <fieldset>
                <legend>Osnovni podaci</legend>
                <div className="lbl-inp-pair">
                  <label htmlFor="firstName">Ime:</label>
                  <input
                    value={form.firstName}
                    onChange={onChange}
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Student"
                    size="30"
                    maxLength="50"
                  />
                </div>

                <div className="lbl-inp-pair">
                  <label htmlFor="lastName">Prezime:</label>
                  <input
                    value={form.lastName}
                    onChange={onChange}
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="EFZG"
                    size="30"
                    maxLength="100"
                  />
                </div>

                <div className="lbl-inp-pair">
                  <label htmlFor="profilePicUrl">Profilna slika (URL):</label>
                  <input
                    value={form.profilePicUrl}
                    onChange={onChange}
                    type="text"
                    name="profilePicUrl"
                    id="profilePicUrl"
                    placeholder="www.template.com/profilna.png"
                    size="30"
                  />
                </div>

                <div className="lbl-inp-pair">
                  <label htmlFor="userEmail">Email:</label>
                  <input
                    value={form.userEmail}
                    onChange={onChange}
                    type="email"
                    name="userEmail"
                    id="userEmail"
                    placeholder="student@net.efzg.hr"
                    size="30"
                    maxLength="100"
                  />
                </div>
              </fieldset>
              <fieldset>
                <legend>Labele</legend>
                <div className="lbl-inp-pair">
                  <label
                    htmlFor="labelName"
                    title="Labele za označavanje prioriteta/vrste zadataka (posao, fakultet, prioritetno, srednje važno...)."
                    className="has-tooltip"
                  >Labela:</label
                  >
                  <input
                    value={labelForm.labelName}
                    onChange={onChangeLabel}
                    type="text"
                    name="labelName"
                    id="labelName"
                    placeholder="Unesi ime labele..."
                    size="30"
                    maxLength="25"
                  />
                </div>
                <div className="lbl-inp-pair">
                  <label
                    htmlFor="labelColor"
                    title="Biraj svjetlije tonove zbog kontrasta s crnim tekstom labela."
                    className="has-tooltip"
                  >Boja labele:</label
                  >
                  <input
                    value={labelForm.color}
                    onChange={onChangeLabel}
                    className="color-picker"
                    type="color"
                    name="color"
                    id="labelColor"
                  />
                </div>
                <div className="form-btn-container">
                  <button className="form-btn" type="button" id="add-lbl-btn" onClick={addLabel}>
                    Dodaj labelu
                  </button>
                </div>
                <p>Labele <span className="italic">(klikni za izbrisati)</span></p>
                <div id="admin-modal__label-container" className="label-container">
                  {form.priorityLabels.map((label) => (
                    <div
                      onClick={() => removeLabel(label)}
                      key={label.id}
                      className="priority-label"
                      id={label.id}
                      style={{backgroundColor: label.color}}
                    >
                      {label.labelName}
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend>Početne postavke</legend>
                <div className="warning-box">
                  <p className="bold">Pažnja!</p>
                  <p>
                    Izbor ove opcije briše sve korisničke podatke, dodane projekte,
                    dane i labele.
                  </p>
                </div>
                <div className="form-btn-container">
                  <button className="form-btn" type="button" onClick={onReset}>
                    Izbriši sve
                  </button>
                </div>
              </fieldset>
            </form>
            <div className="form-btn-container">
              <button className="form-btn" type="button" onClick={onSubmit}>
                Spremi
              </button>
              <button className="form-btn" type="reset" onClick={toggleModal}>
                Odustani
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Header;
