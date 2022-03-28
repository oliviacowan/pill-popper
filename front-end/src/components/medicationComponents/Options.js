import { parse } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export default function Options(props) {
  const parsedInfoKeys = props.infoKeys.map(key => <li 
    key={ key } 
    onClick={() => props.selectInfo(key)} >{ key }</li>)

  return (
    <li>
      <ul>
        { parsedInfoKeys }
      </ul>
    </li>
  )
}