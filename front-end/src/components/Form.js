import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Form.scss";
import Time from "./Time"

export default function Form(props) {
  const children = Object.values(props.children)
  const [medicationName, setMedicationName] = useState("" || props.medName);
  const [childId, setChildId] = useState("" || props.ChildId);
  const [dose, setDose] = useState("" || props.dose);
  const [withFood, setWithFood] = useState(false || props.withFood);
  const [times, setTime] = useState('10:00');
  const [sevedTime, setSavedTime] = useState([]);

  const handleRemoveItem = name => { setSavedTime(sevedTime.filter(item => item !== name))}
  
  const toggleWithFood = function () {
    if (withFood) {
      setWithFood(false);
    } else {
      setWithFood(true);
    }
  };

  const save = function () {
    axios.post(`/medications/${childId}/new`, {
      child_id: childId,
      name: medicationName,
      dose: dose,
      with_food: withFood,
      times: times,
    })
    .then(() => {
      console.log('Medication added successfully!')
      props.setViewForm(false);
    })
    .catch(err => console.log('There has been an ERROR: ', err));
  };
  
  const cancel = function () {
    // closes form
    //add code to clear input values
    props.setViewForm(false);
  };

  const childNames = (children.map((child) => {
    return <option key={child.id} value={child.id} >{child.name}</option>
  }))

  const timeList = sevedTime.map(item => (
    <div>
     <span>{item}</span>
      <button onClick={() => handleRemoveItem(item)}>x</button>
     
    </div>
  ))


  return (
    <main className="medication__form">
      <section className="medication__form--main">
        <form className="medication__form--create">
          <div className='medication-form'>
            <label>Choose Family Member:</label>
            
            <select onChange={(event) => setChildId(event.target.value)} name="names" className="name-menu" id="names">
              <option value="select">Select</option>
              {/* <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option> */}
              {childNames}
            </select>
          </div>

          <div className='medication-form'>
            <label>Medication Name:</label>
            <input
              type="text"
              placeholder="Medication"
              value={medicationName}
              onChange={(event) => {
                setMedicationName(event.target.value);
                console.log("medicationName: ", medicationName);
              }}
            />
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
                  console.log("dose: ", dose);
                }}
              />
            </div>
          </div>
          <div>
            <span className="withFood">
              <label> Take with food?</label>
              <input type="checkbox" value={withFood} onClick={toggleWithFood} defaultChecked={withFood}/>
            </span>
          </div>
        </form>
        <div className="time">
        <Time time={times} setTime={setTime} />
        <button onClick={()=>setSavedTime((prev) => [...prev, times])}>Add time</button>
         </div>
         <div>
           <ul>
           {timeList}
           </ul>
         </div>
        
      </section>

      <section className="medication__form--actions">
        <button onClick={save}>Save</button>
        <button onClick={cancel}>Cancel</button>
      </section>
    </main>
  );
  }
