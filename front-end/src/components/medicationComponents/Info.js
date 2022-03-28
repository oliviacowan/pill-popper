import React from "react";

import "./info.scss";

export default function Info(props) {
  
  const infoClassName = props.color + " selected-info-card"

  return (
    <li className={ infoClassName } >
        <div className="selected-info-header" >
          <button className="back" onClick={() => props.transition("OPTIONS") }>
            <i class="fa-solid fa-circle-chevron-left back-icon"></i>
            <strong>BACK</strong>
          </button>
          <button className="close" onClick={() => props.transition("DEFAULT") }>
            <strong>X</strong>
          </button>
        </div>
        <div className="selected-info-section">
          <p>
            <strong>{ props.info.infoKey }: </strong> 
            { props.info.info }
          </p>
        </div>
    </li>
  );
}