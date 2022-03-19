import React from "react";

import './Form.scss';

export default function Form(props){

  return (
    <main className="medication__form">
      <section className="medication__form--main" > 
        <form className="medication__form--create" >
          <label>Choose Family Member:</label>
          <input type="text" placeholder="Name"/>
          <input type="text" placeholder="Medication" />
          <div>
            <input type="text" placeholder="doseage"/>
            <input type="text" placeholder="Times per day"/>
          </div>
          <input type="checkbox" />
        </form>
      </section>

      <section className="medication__form--actions">
          <button>Save</button>
          <button>Cancel</button>
        </section>
    </main>
  );
}