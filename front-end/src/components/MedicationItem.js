import react, { useState } from "react";
import Confirm from "./medicationActions/Confirm";
import "./MedicationItem.scss";

export default function MedicationItem(props) {
  const [destroy, setDestroy] = useState(false);

  function getInfo() {
    console.log("clicked info icon", props.id);
  }
 
  const destroyBoolean = function () {
    if (!destroy) {
      setDestroy(true);
    }
  };

  function edit() {
    console.log("clicked edit icon", props.id);
  }

  return (
    <>
      {destroy ? (
        <Confirm destroy={destroy} setDestroy={setDestroy} />
      ) : ( 
        <li className="medication-item">
          <div className="medication-time-name">
            <p className="scheduled-time">
              {props.time} <i className="fa-solid fa-arrow-right-long"></i>
            </p>

            <h2 className="medication-name">{props.name} <span className='name-dose'>{props.dose}mg</span></h2>

          </div>
          <section className="medication-item-icons">
            <p onClick={edit}>
              <i className="fa-solid fa-user-pen"></i>
            </p>
            <p>
              <i className="fa-solid fa-trash" onClick={destroyBoolean}></i>
            </p>
            <p onClick={getInfo}>
              <i className="fa-solid fa-circle-info"></i>
            </p>
          </section>
        </li>
      )}
    </>
  );
}
