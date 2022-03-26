import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Calendar from "./components/Calendar";
import axios from "axios";
import { io } from "socket.io-client";
// For testing:

import ChildrenList from "./components/ChildrenList";
import logo from "./favicon.ico";

import "./App.scss";

import { searchApi } from './helpers/apiFunctions'
import useVisualMode from './hooks/useVisualMode'
import Form from "./components/Form";
import Status from "./components/Status";
import MedicationItemList from "./components/MedicationItemList";

function App(props) {
  const NONE = "NONE";
  const CALENDAR = "CALENDAR";
  const CHILDLIST = "CHILDLIST";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const LOADING = "LOADING";
  const SAVING = "SAVING"
  const { mode, transition } = useVisualMode(NONE)
  

  //const [viewCalendar, setViewCalendar] = useState(false);
  //const [viewUser, setViewUser] = useState(false);
  const [value, onChange] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [selectedMed, setSelectedMed] = useState({})

  console.log("Rendering App")

  const [state, setState] = useState({
    medications:[],
    child: "",
    children: {},
  });


  const hasValue = Object.keys(state.children).length !== 0;

  const setSectedChild = (child) => setState({ ...state, child });

  
  useEffect(() => {
    searchApi('word');
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
  }, []);

  const loaderMedications = ()=>{
    axios
      .get("users/1/medications")
      .then((response) => {

        console.log(response);
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
  }
  // state.children
  useEffect(() => {
    loaderMedications()
  }, []);
  
  function editor(medication) {
    axios.get(`medications/${medication.id}`)
    .then((res) => {
      const data = res.data[0];
      setSelectedMed({
        childName: medication.child_name,
        childId: data.child_id,
        medName: data.name,
        medId: data.id,
        withFood: data.with_food,
        dose: data.dose,
        times: data.times
      })
      transition(EDIT);
    });
  }

  
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
        { mode === CHILDLIST && (
          <ChildrenList children={Object.values(state.children)} value={state.child}
              onChange={setSectedChild}/>
            )}
          { mode === LOADING && <Status message='LOADING' /> }
          { mode === SAVING && < Status message='SAVING' /> }
          { mode === CALENDAR && <Calendar onChange={onChange} value={value} />}

          { mode === CREATE && <Form  
            transition = { transition } 
            children={Object.values(state.children)} 
            mode={mode} 
            loaderMedications={loaderMedications} 
            searchApi = { searchApi } /> }

          { mode === EDIT && <Form 
            transition = { transition } 
            { ...selectedMed } 
            mode={mode} 
            medications={medications} 
            setMedications={setMedications} 
            loaderMedications={loaderMedications} 
            searchApi = { searchApi } /> }

          { mode !== CREATE && mode !== EDIT && mode !== SAVING && mode !== LOADING &&
            <footer>
            <button className="add-medication" onClick={ () => { transition(CREATE) } }>Add Medication</button>
            </footer> }
          { mode !== SAVING && mode !== LOADING && medications.length > 0 && <MedicationItemList childState={state.child} childrenState={state.children} medications={medications} date={value} children={state.children} setMedications={setMedications} edit={ editor } />}
          
      </span>
    </main>
  );
}

export default App;
