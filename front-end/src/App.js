import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import Calendar from "./components/Calendar";
import axios from "axios";
import { io } from "socket.io-client";
// For testing:

import ChildrenList from "./components/ChildrenList";


import "./App.scss";

import { searchApi } from './helpers/apiFunctions'
import useVisualMode from './hooks/useVisualMode'
import Form from "./components/Form";
import Status from "./components/Status";
import MedicationItemList from "./components/MedicationItemList";
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyComponent from "./components/Map"



export default function App(props) {
  const NONE = "NONE";
  const CALENDAR = "CALENDAR";
  const CHILDLIST = "CHILDLIST";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const LOADING = "LOADING";
  const SAVING = "SAVING";
  const MAP = "MAP";
  const { mode, transition } = useVisualMode(NONE)


  //const [viewCalendar, setViewCalendar] = useState(false);
  //const [viewUser, setViewUser] = useState(false);
  const [value, onChange] = useState(new Date());
  const [medications, setMedications] = useState([]);
  const [selectedMed, setSelectedMed] = useState({})
  const [search, setSearch] = useState()
  const [searchId, setSearchId] = useState()
  const [searchName, setSearchName] = useState()


  const [state, setState] = useState({
    // medications: [],
    child: "",
    children: {},
  });


  /// Push notifications
  Pusher.logToConsole = false;
  useEffect(() => {
    const pusher = new Pusher('e5acfbcf6043307a71dc', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {

      const notify = () => toast(data.message, {

        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      notify()
    });
  }, [])


  const setSectedChild = (child) => setState({ ...state, child });

  // useEffect(() => {
  //   loaderMedications()
  //   return () => {
  //     setMedications([]);
  //   };
  // }, []);

  // useEffect(() => {
  //   loadChildren()
  //   return () => {
  //     setSectedChild({});
  //   };
  // }, []);
  const loadChildren = () => {
    axios
      .get("http://localhost:8081/users/1/children")
      .then((res) =>
        setState((prev) => ({
          ...prev,
          children: res.data,
        }))
      )
      .catch((error) => {
        console.log(error);
      });
  }

  const loaderMedications = () => {
    axios
      .get("http://localhost:8081/users/1/medications")
      .then((response) => {
        setMedications((prev) =>
          [{
            ...prev,
            
            medications: response.data,
          }],
        )
      }).catch((error) => {
        console.log(error.message);
      });
  }

useEffect(() => {
  loadChildren()
  loaderMedications()
},[])

  function searchResults(data) {
    setSearchId(Object.keys(data)[0]);
    setSearchName(Object.values(data)[0]);
    console.log("Name and id from api: ", searchId, searchName)
  }

  function editor(medication) {
    axios.get(`http://localhost:8081/medications/${medication.id}`)
      .then((res) => {
        const data = res.data[0];
        setSelectedMed({
          childName: medication.child_name,
          childId: data.child_id,
          medName: data.name,
          medId: data.id,
          withFood: data.with_food,
          textMessage: data.text_message,
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
          onClick={() => { mode === CHILDLIST ? transition(NONE) : transition(CHILDLIST) }}
        />

        <div className="day-name">{value.toString().substring(0, 15)}</div>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="nav-icon"
          onClick={() => { mode === CALENDAR ? transition(NONE) : transition(CALENDAR) }}
        />
      </nav>
      <span className="component">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {mode === CHILDLIST && (
          <ChildrenList loadChildren={loadChildren} children={Object.values(state.children)} value={state.child}
            onChange={setSectedChild} />
        )}
        {mode === LOADING && <Status message='LOADING' />}
        {mode === SAVING && < Status message='SAVING' />}
        {mode === CALENDAR && <Calendar onChange={onChange} value={value} />}

        {mode === CREATE && <Form
          transition={transition}
          children={Object.values(state.children)}
          mode={mode}
          loaderMedications={loaderMedications}
          searchApi={searchApi}
          searchResults={searchResults}
          searchData={{ id: searchId, name: searchName }} />}

        {mode === EDIT && <Form
          transition={transition}
          {...selectedMed}
          mode={mode}
          medications={medications}
          setMedications={setMedications}
          loaderMedications={loaderMedications}
          searchApi={searchApi}
          searchResults={searchResults}
          searchData={{ id: searchId, name: searchName }} />}

        {mode !== CREATE && mode !== EDIT && mode !== SAVING && mode !== LOADING &&
          <footer>
            <button className="add-medication" onClick={() => { transition(CREATE) }}>Add Medication</button>
          </footer>}
        {mode !== SAVING && mode !== LOADING && medications.length > 0 &&
          <MedicationItemList

            childState={state.child}
            childrenState={state.children}
            medications={medications}
            date={value}
            children={state.children}
            setMedications={setMedications}
            edit={editor}
          />}
        <h3 className="map-title">Pharmacies near you: </h3>
        <MyComponent />

        <header>
          <h3 className="app-title">
            PILL - POPPER
          </h3>
        </header>
      </span>
    </main>
  );
}


