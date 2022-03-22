import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Calendar from "./components/Calendar";
import axios from "axios";
// For testing:

import ChildrenList from "./components/ChildrenList";
import logo from "./favicon.ico";

import "./App.scss";

import useVisualMode from './hooks/useVisualMode'
import Form from "./components/Form";
import Status from "./components/Status";
import MedicationItemList from "./components/MedicationItemList";

function App(props) {
  const CALENDAR = "CALENDAR";
  const CHILDLIST = "CHILDLIST";
  const MEDLIST = "MEDLIST";
  const CREATE = "CREATE";
  const EDIT = 'EDIT';
  const { mode, transition } = useVisualMode(MEDLIST)


  const [viewCalendar, setViewCalendar] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [value, onChange] = useState(new Date());
  const [viewForm, setViewForm] = useState(false);
  const [medications, setMedications] = useState([]);


  const [state, setState] = useState({
    medications:[],
    child: "",
    children: {},
  });

  const hasValue = Object.keys(state.children).length !== 0;

  const setSectedChild = (child) => setState({ ...state, child });

  useEffect(() => {
    axios
      .get("/users/1/children")
      .then((res) =>
        setState((prev) => ({
          ...prev,
          children: res.data,
        }))
      )
      .catch((error) => {
        console.log(error);
      });
  }, [state.children]);

  useEffect(() => {
    axios
      .get("users/1/medications")
      .then((response) => {
        // console.log(response);
        setMedications((prev) => [
          {
            ...prev,
            medications: response.data,
          },
        ]);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }, [medications]);

  const calendarBoolean = function () {
    if (viewCalendar) {
      setViewCalendar(false);
    } else {
      setViewCalendar(true);
    }
  };
  const userListBoolean = function () {
    if (viewUser) {
      setViewUser(false);
    } else {
      setViewUser(true);
    }
  };

  const medicationFormBoolean = function () {
    if (viewForm) {
      setViewForm(false);
    } else {
      setViewForm(true);
    }
  };
  return (
    <main className="layout">
      <nav>
        <FontAwesomeIcon
          icon={faUsers}
          className="nav-icon"
          onClick={ () => { transition(CHILDLIST) }}
        />
        <div className="day-name">{value.toString().substring(0, 15)}</div>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="nav-icon"
          onClick={ () => { transition(CALENDAR) }}
        />
      </nav>
      <span className="component">
        {mode === CHILDLIST && (
          <ChildrenList children={Object.values(state.children)} value={state.child}
              onChange={setSectedChild}/>
            )}
            
         {mode === CALENDAR && <Calendar onChange={onChange} value={value} />}
         {mode === CREATE && <Form viewForm={viewForm} setViewForm={setViewForm} children={Object.values(state.children)} />}
            <footer>
              <button className="add-medication" onClick={ () => { transition(CREATE) } }>Add Medication</button>
            </footer>
       {medications.length > 0 && <MedicationItemList childState={state.child} childrenState={state.children} medications={medications} date={value} children={state.children} setMedications={setMedications}/>}
        {/* components here */}
        {/* <Calendar /> */}
      </span>
    </main>
  );
}

export default App;
