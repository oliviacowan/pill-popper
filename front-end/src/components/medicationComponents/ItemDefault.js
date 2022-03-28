import React from "react";

export default function ItemDefault(props) {


  return (
    <li className={props.color}>
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
          <i className="fa-solid fa-trash" onClick={() => props.transition("CONFIRM")}></i>
        </p>
        {props.fda_id && <p onClick={ () => props.getFda() }>
          <i className="fa-solid fa-circle-info"></i>
        </p>}
      </section>
    </li>
  );
}