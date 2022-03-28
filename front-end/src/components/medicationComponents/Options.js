import { parse } from "@fortawesome/fontawesome-svg-core";
import React from "react";

import "./options.scss";

export default function Options(props) {
  const parsedInfoKeys = props.infoKeys.map(key => <li 
    className={"list-item"}
    key={ key } 
    onClick={() => props.selectInfo(key)} >{ key }</li>)

    const listClassNames = props.color + " options-card"
  return (
    <li className={ listClassNames } >
      <div className="options-header">
        <h3>Available Drug Information:</h3>
        <button className="close" onClick={() => props.transition("DEFAULT") }><strong>X</strong></button>
      </div>
      <ul className='options-list'>
        { parsedInfoKeys }
      </ul>
    </li>
  )
}