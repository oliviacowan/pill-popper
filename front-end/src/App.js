import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Calendar from "./components/Calendar";
import axios from "axios";
// For testing:


import ChildrenList from "./components/ChildrenList";
import logo from "./favicon.ico";


import "./App.scss";

import Form from "./components/Form";
import Status from "./components/Status";
import MedicationItemList from "./components/MedicationItemList";



// const children = [
//   { id: 1, name: "Alex", avatar: logo, selected: 1 },
//   { id: 2, name: "Andrew", avatar: logo, selected: 1 },
//   { id: 3, name: "Jack", avatar: logo, selected: 1 },
//   { id: 4, name: "Tilda", avatar: logo, selected: 1 },
//   { id: 5, name: "Gary", avatar: logo, selected: 1 }
//   ]

function App(props) {
  const [viewCalendar, setViewCalendar] = useState(false);
  const [viewUser, setViewUser] = useState(false);
  const [value, onChange] = useState(new Date());
  const [viewForm, setViewForm] = useState(false);

  const [state, setState] = useState({
    child: '',
    children: {},
  });

  const hasValue = Object.keys(state.children).length !== 0

  const setSectedChild = child => setState({ ...state, child });

  useEffect(() => {

   axios.get('/users/1/children')
      .then(res => setState(prev => ({
        ...prev,
        children: res.data,
      })))
      .catch((error) => {
        console.log(error)
    });
  }, [])
  

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
          onClick={userListBoolean}
          />
        <div className="day-name">{value.toString().substring(0, 15)}</div>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="nav-icon"
          onClick={calendarBoolean}
          />
      </nav>
      <span className="component">
        {viewUser && hasValue && (
          <ChildrenList children={Object.values(state.children)} value={state.child}
              onChange={setSectedChild}/>
            )}
            
         {viewCalendar && <Calendar onChange={onChange} value={value} />}
            {viewForm && <Form viewForm={viewForm} setViewForm={setViewForm} children={state.children} />}
            <footer>
              <button className="add-medication" onClick={medicationFormBoolean}>Add Medication</button>
            </footer>
        {!Object.keys(state.children) && <MedicationItemList date={value} children={state.children}/>}
        {/* components here */}
        {/* <Calendar /> */}
      </span>
    </main>
  );
}

export default App;
