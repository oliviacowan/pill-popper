import React, { useState} from "react";

import './Form.scss';

export default function Form(props){
  const [medicationName, setMedicationName] = useState('')
  const [name, setName] = useState('')
  const [dose, setDose] = useState('')
  const [interval, setInterval] = useState('')
  const [input, setInput] = useState(false)

  const handleChange = function() {
    if (input) {
      setInput(false)
    } else {
      setInput(true)
    }
    console.log(input)
  }

  const save = function() {
    console.log(
      'name: ', name, 'medication: ', medicationName, 'dosage: ', dose, 'interval: ', interval, 'checkbox: ', input
    )
  }
  
  return (
    <main className="medication__form">
      <section className="medication__form--main" > 
        <form className="medication__form--create" >
          <div>
            <label>Choose Family Member:</label>
            <input 
              type="text" 
              placeholder="Name"
              value={name}
              onChange={event => {setName(event.target.value);
                console.log('name: ', name)
              }}
            />
          </div>

          <div>
            <label>Enter the Medication Name:</label>
            <input 
              type="text" 
              placeholder="Medication" 
              value={medicationName}
              onChange={(event) => {setMedicationName(event.target.value);
              console.log('medicationName: ', medicationName)}}
            />
          </div>

          <div>
            <div>
              <label>Dosage mg:</label>
              <input 
                type="text" 
                placeholder="doseage"
                value={dose}
                onChange={event => {setDose(event.target.value);
                console.log('dose: ', dose)}}
              />
            </div>
            <div>
              <label>Dosage Insterval:</label>
              <input 
              type="text" 
              placeholder="Times per day"
              value={interval}
              onChange={event => {setInterval(event.target.value);
              console.log('interval: ', interval)}}
              />
            </div>
          </div>
          <div>
            <input 
            type="checkbox"
            value={input}
            onClick={handleChange}
            />
            <label> Take with food?</label>
          </div>
        </form>
      </section>

      <section className="medication__form--actions">
          <button onClick={save}>Save</button>
          <button>Cancel</button>
        </section>
    </main>
  );
}