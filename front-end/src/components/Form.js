import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Form.scss";
import Time from "./Time"

import { searchApi } from "../helpers/apiFunctions";

export default function Form(props) {
  let childNames;
  let children;
  const searchId = Object.keys(props.searchData)[0];
  const searchName = props.searchData[searchId][0]

  if (props.children){
    children = Object.values(props.children)
  } else {
    childNames = <option key={props.childId} value={props.childId} >{props.childName}</option>
  }
const now = new Date();
now.getHours()
now.getMinutes()
const timeNow = `${now.getHours()}:${now.getMinutes()}`

  const [medicationName, setMedicationName] = useState("" || props.medName);
  const [childId, setChildId] = useState(props.childId || "");
  const [dose, setDose] = useState("" || props.dose);
  const [withFood, setWithFood] = useState(false || props.withFood);
  const [times, setTime] = useState(timeNow || props.time);
  const [savedTime, setSavedTime] = useState(props.times || []);
  const [more, setMore] = useState(false || props.more)
  const [endDate, setEndDate] = useState(new Date || props.endDate)

  const handleRemoveTime = time => { setSavedTime(savedTime.filter(item => item !== time))}
  
  const toggleWithFood = function () {
    if (withFood) {
      setWithFood(false);
    } else {
      setWithFood(true);
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
    if (mode === "CREATE"){
      axios.post(`/medications/${childId}/new`, {
        child_id: childId,
        name: medicationName,
        dose: dose,
        with_food: withFood,
        times: savedTime,
        end_date: endDate
      })
      .then(() => {
        props.loaderMedications()
        console.log('Medication added successfully!')
        props.transition("NONE");
      })
      .catch(err => console.log('There has been an ERROR: ', err));

    } else if (mode === "EDIT") {
      axios.put(`/medications/${props.medId}/edit`, {
        child_id: childId,
        name: medicationName,
        dose: dose,
        with_food: withFood,
        times: savedTime
      })
      .then((res) => {
        props.loaderMedications()
        // props.loaderMedications()
      //   console.log("medID",props.medId)
      //   const medicationsNew = [...props.medications]
      //   medicationsNew[0]["medications"][props.medId] = {...medicationsNew[props.medId], 
      //     child_id: childId,
      //     name: medicationName,
      //     dose: dose,
      //     with_food: withFood,
      //     time: savedTime}
      //  console.log("MEDICATIONS",medicationsNew[0]["medications"][props.medId])
      //   // props.setMedications((prev)=> [...prev, medicationsNew])
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

  const timeList = savedTime.map( time => (
    <div className="each-time"> 
     <span> { time }</span>
      <div onClick={() => handleRemoveTime(time)}><i class="fa-regular fa-circle-xmark"></i></div>
     
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
            </select> }
            {props.mode === "EDIT" && <div><p>{ props.childName }</p></div> }
          </div>

          <div className='medication-form dropdown-content'>
            <label>Medication Name:</label>
            <input type="text" 
              placeholder="Medication"
              value={medicationName}
              onChange={(event) => {
                setMedicationName(event.target.value);
                searchApi(event.target.value, props.searchResults);
              }}
              />
              { searchName && <a onClick={ () =>{ setMedicationName(searchName) } } >{ searchName }</a> }
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
              <input type="checkbox" value={withFood} onClick={toggleWithFood} defaultChecked={withFood}/>
            </span>
          </div>
          <div className="with-food">
            <span >
              <label> Take daily?  </label>
              <input type="checkbox" value={more} onClick={moreThanOnce} defaultChecked={more}/>
              { more && <div>
              <label>End date: </label>
              <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)}/>
            </div>}
            </span>
          </div>
        </form>
        <div className="time">
        <Time time={times} setTime={setTime} />
        <button onClick={()=>setSavedTime((prev) => [...prev, times])}>Add time</button>
         </div>
         <div>
           <ul>
           { timeList }
           </ul>
         </div>
        
      </section>

      <section className="medication__form--actions">
        <button className="form-button" onClick={() => save(props.mode)}>Save</button>
        <button className="form-button" onClick={cancel}>Cancel</button>
      </section>
    </main>
  );
  }
