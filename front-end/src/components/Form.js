import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Form.scss";

export default function Form(props) {
  const children = Object.values(props.children)
  const [medicationName, setMedicationName] = useState("" || props.medName);
  const [childId, setChildId] = useState("" || props.ChildId);
  const [dose, setDose] = useState("" || props.dose);
  const [withFood, setWithFood] = useState(false || props.withFood);

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

  

  return (
    <main className="medication__form">
      <section className="medication__form--main">
        <form className="medication__form--create">
          <div>
            <label>Choose Family Member:</label>
            
            <select onChange={(event) => setChildId(event.target.value)} name="names" className="name-menu" id="names">
              <option value="select">Select</option>
              {/* <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option> */}
              {childNames}
            </select>
          </div>

          <div>
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
            <div>
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
      </section>

      <section className="medication__form--actions">
        <button onClick={save}>Save</button>
        <button onClick={cancel}>Cancel</button>
      </section>
    </main>
  );
}
