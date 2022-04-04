import React from "react"
import { searchApi } from "../../helpers/apiFunctions"

export function SearchItem(props){

  return (
    <a className={props.className} onClick={props.onClick} >
      {props.name}
    </a>
  );
}