import react, { useState } from "react";
import Confirm from "./medicationActions/Confirm";
import "./MedicationItem.scss";

export default function MedicationItem({ time, name, id, child }) {
  const [destroy, setDestroy] = useState(false);

  function getInfo() {
    console.log("clicked info icon", id);
  }
 
  const destroyBoolean = function () {
    if (!destroy) {
      setDestroy(true);
    }
  };

  function edit() {
    console.log("clicked edit icon", id);
  }

  return (
    <>
      {destroy ? (
        <Confirm destroy={destroy} setDestroy={setDestroy} />
      ) : (
        <li className="medication-item">
          <div className="medication-time-name">
            <p className="scheduled-time">
              {time} <i className="fa-solid fa-arrow-right-long"></i> {child}
            </p>
            <h2 className="medication-name">{name}</h2>
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
