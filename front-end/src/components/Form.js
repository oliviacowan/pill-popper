import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Form.scss";
import Time from "./Time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { searchApi } from "../helpers/apiFunctions";

export default function Form(props) {
  let childNames;
  let children;
  //let fdaName;
  console.log("SEARCHDATA",props.searchData.name, props.searchData.id)
  //let fdaId = props.searchData.name;

  if (props.children) {
    children = Object.values(props.children)
  } else {
    childNames = <option key={props.childId} value={props.childId} >{props.childName}</option>
  }

  const now = new Date();
  now.getHours()
  now.getMinutes()
  const timeNow = `${now.getHours()}:${now.getMinutes()}`


  function addHours(date, hours) {
    const newDate = new Date(date);
    newDate.setHours(newDate.getHours() + hours);
    return newDate;
  }
  

  const [medicationName, setMedicationName] = useState("" || props.medName);
  const [childId, setChildId] = useState(props.childId || "");
  const [dose, setDose] = useState("" || props.dose);
  const [withFood, setWithFood] = useState(false || props.withFood);
  const [times, setTime] = useState(timeNow || props.time);
  const [savedTime, setSavedTime] = useState(props.times || []);
  const [more, setMore] = useState(false || props.more)
  const [endDate, setEndDate] = useState(addHours(new Date(), 1) || props.endDate)
  const [textMessage, setTextMessage] = useState(false || props.textMessage);
  const [fdaId, setFdaId] = useState('none')
  

  const handleRemoveTime = time => { setSavedTime(savedTime.filter(item => item !== time)) }

  function addFda(id, name) {
    setMedicationName(name);
    setFdaId(id);
  }


  const toggleWithFood = function () {
    if (withFood) {
      setWithFood(false);
    } else {
      setWithFood(true);
    }
  };

  const toggleSendMessage = function () {
    if (textMessage) {
      setTextMessage(false);
    } else {
      setTextMessage(true);
    }
  };

  const moreThanOnce = function () {
    if (more) {
      setMore(false);
    } else {
      setMore(true);
    }
  };

  const save = (mode) => {
    props.transition("SAVING");
    console.log(medicationName);
    if (mode === "CREATE") {
      axios.post(`http://localhost:8081/medications/${childId}/new`, {
        child_id: childId,
        name: medicationName,
        dose: dose,
        with_food: withFood,
        text_message: textMessage,
        times: savedTime,
        end_date: endDate,
        fda_id: fdaId
      })
        .then(()=>{
          props.loaderMedications()})
        .then(()=>{props.transition("NONE");})
        .then(() => props.clearSearch())
        .catch(err => console.log('There has been an ERROR: ', err));

    } else if (mode === "EDIT") {
      axios.put(`http://localhost:8081/medications/${props.medId}/edit`, {
        child_id: childId,
        name: medicationName,
        dose: dose,
        with_food: withFood,
        text_message: textMessage,
        times: savedTime
      })
        .then((res) => {
          props.loaderMedications()
          console.log('Medication changed successfully!')
          props.transition("NONE");
        })
        .catch(err => console.log('There has been an ERROR: ', err));
    }
  }

  const cancel = function () {
    // closes form
    //add code to clear input values
    props.transition("NONE");
  };

  if (props.children) {
    childNames = (children.map((child) => {
      return <option key={child.id} value={child.id} >{child.name}</option>
    }))
  }

  const timeList = savedTime.map(time => (
    <div className="each-time" key={time}>
      <span> {time}</span>
      <div onClick={() => handleRemoveTime(time)}><i className="fa-regular fa-circle-xmark"></i></div>

    </div>
  ))

  return (
    <main className="medication__form">
      <section className="medication__form--main">
        <form className="medication__form--create">
          <div className='medication-form'>
            <label>Choose Family Member:</label>
            {props.mode !== "EDIT" &&

              <select onChange={(event) => setChildId(event.target.value)} name="names" className="name-menu" id="names">
                <option value="select">Select</option>
                {/* <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option> */}
                {childNames}
              </select>}
            {props.mode === "EDIT" && <div><p>{props.childName}</p></div>}
          </div>

          <div className='medication-form dropdown-content'>
            <label>Medication Name:</label>
            <input type="text"
              placeholder="Medication"
              value={medicationName}
              onChange={(event) => {
                setMedicationName(event.target.value);
                searchApi(event.target.value, props.searchResults);
                props.clearSearch();
              }}
            />

            {props.searchData.id &&
              <a className="search-result"
              onClick={ () => { 
                addFda(props.searchData.id, props.searchData.name); 
                setMedicationName(props.searchData.name[0])
                props.clearName() } } >{props.searchData.name}</a>}

          </div>

          <div>
            <div className='medication-form'>
              <label>Dosage mg:</label>
              <input
                type="text"
                placeholder="doseage"
                value={dose}
                onChange={(event) => {
                  setDose(event.target.value);

                }}
              />
            </div>
          </div>
          <div className="with-food">
            <span >
              <label> Take with food?  </label>
              <input type="checkbox" value={withFood} onClick={toggleWithFood} defaultChecked={withFood} />
            </span>
          </div>
          <div className="with-food">
            <span >
              <label> Send me a text message?  </label>
              <input type="checkbox" value={textMessage} onClick={toggleSendMessage} defaultChecked={textMessage} />
            </span>
          </div>
          <div className="with-food">
            <span >
              <label> Take daily?  </label>
              <input type="checkbox" value={more} onClick={moreThanOnce} defaultChecked={more} />
              {more && <div>
                <label>End date: </label>
                <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
              </div>}
            </span>
          </div>
        </form>
        <div className="time">
          <Time time={times} setTime={setTime} />
          <button onClick={() => setSavedTime((prev) => [...prev, times])}>Add time</button>
        </div>
        <div>
          <ul>
            {timeList}
          </ul>
        </div>

      </section>

      <section className="medication__form--actions">
        <button className="form-button" onClick={() => save(props.mode)}>Save</button>
        <button className="form-button" onClick={cancel}>Cancel</button>
      </section>
      <button className='close-component' onClick={ () => props.transition('NONE') } >
        <FontAwesomeIcon icon={faXmark } />
      </button>
    </main>
  );
}
