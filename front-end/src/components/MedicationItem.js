import react, { Fragment, useState } from "react";
import axios from "axios";
import Confirm from "./medicationActions/Confirm";
import "./MedicationItem.scss";
import classNames from "classnames";

export default function MedicationItem(props) {
  const [destroy, setDestroy] = useState(false);
  console.log('MED ITEM: ', props.id)
 // const dayClass = classNames("day-list__item", {
    //   "day-list__item--selected": selected,
    //   "day-list__item--full": !spots
    // })
    // const color = classNames("color", 
    // { "--pink": props.color === "#ffc0cb"
    // } )
  // const color = classNames("medication-item", 
  //   {"__pink": props.color === "#ffc0cb"},
  //   {"__purple": props.color === '#9267af'},
  //   {"__blue": props.color === '415ba3'},
  // )

  let color;
if (props.color === "pink") {
  color = "medication-item__pink";
} else if (props.color === 'purple') {
  color = "medication-item__purple";
} else if (props.color === 'yellow') {
  color = "medication-item__yellow"
} else if (props.color === 'green') {
  color = "medication-item__green"
} else if (props.color === 'light-blue') {
    color = "medication-item__light-blue"
} else if (props.color === 'blue') {
    color = "medication-item__blue"
} else if (props.color === 'neutral') {
    color = "medication-item__neutral"
}
  
  function getInfo() {
    console.log("clicked info icon", props.id);
  }

  const destroyBoolean = function () {
    if (!destroy) {
      setDestroy(true);
      console.log("clicked delete icon", props.color);
    }
  };

  
  console.log('coLOUR: ', color)
  return (
    <>
      {destroy ? (
        <Confirm destroy={destroy} setDestroy={setDestroy} deleteMe={props.deleteMe} />
      ) : (
        <li className={color}>
          <div className="medication-time-name">
            <p className="scheduled-time">
              {props.time} <i className="fa-solid fa-arrow-right-long"></i>{" "}
              {props.child}
            </p>

            <h2 className="medication-name">
              {props.name} <span className="name-dose">{props.dose}mg</span>
            </h2>
          </div>
          <section className="medication-item-icons">
            <p onClick={ props.onEdit }>
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
