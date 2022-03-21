import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Form.scss";

export default function Form(props) {
  console.log('form props', props)
  const [medicationName, setMedicationName] = useState("");
  const [childId, setChildId] = useState("");
  const [dose, setDose] = useState("");
  const [input, setInput] = useState(false);

  const handleChange = function () {
    if (input) {
      setInput(false);
    } else {
      setInput(true);
    }
    console.log(input);
  };

  const save = function () {
    axios.post(`/medications/${childId}/new`, {
      child_id: childId,
      name: medicationName,
      dose: dose,
      with_food: input,
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

  // const selectName = function() {
  //   let selected = document.getElementById("names")
  //   const nameValue = selected.options[selected.selectedIndex].text;
  //   console.log(nameValue)
  // }
  const childNames = props.children.map((child) => {
    return <option key={child.id} value={child.id} >{child.name}</option>
  })

  

  return (
    <main className="medication__form">
      <section className="medication__form--main">
        <form className="medication__form--create">
          <div>
            <label>Choose Family Member:</label>
            {/* <input 
              type="text" 
              placeholder="Name"
              value={name}
              onChange={event => {setName(event.target.value);
                console.log('name: ', name)
              }}
            /> */}
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
            {/* <div>
              <label>Dosage Insterval:</label>
              <input
                type="text"
                placeholder="Times per day"
                value={interval}
                onChange={(event) => {
                  setInterval(event.target.value);
                  console.log("interval: ", interval);
                }}
              />
            </div> */}
          </div>
          <div>
            <span className="checkbox">
              <label> Take with food?</label>
              <input type="checkbox" value={input} onClick={handleChange} />
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
