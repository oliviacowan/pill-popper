import React from "react";

import './Form.scss';

export default function Form(props){

  return (
    <main className="medication__form">
      <section className="medication__form--main" > 
        <form className="medication__form--create" >
          <div>
            <label>Choose Family Member:</label>
            <input type="text" placeholder="Name"/>
          </div>

          <div>
            <label>Enter the Medication Name:</label>
            <input type="text" placeholder="Medication" />
          </div>

          <div>
            <div>
              <label>Dosage mg:</label>
              <input type="text" placeholder="doseage"/>
            </div>
            <div>
              <label>Dosage Insterval:</label>
              <input type="text" placeholder="Times per day"/>
            </div>
          </div>
          <div>
            <input type="checkbox" />
            <label> Take with food?</label>
          </div>
        </form>
      </section>

      <section className="medication__form--actions">
          <button>Save</button>
          <button>Cancel</button>
        </section>
    </main>
  );
}