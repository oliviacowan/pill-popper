import React from "react";

export default function Info(props) {
  console.log(props)
  return (
    <li>
      <p>
        <strong>{ props.info.infoKey }:</strong> 
         { props.info.info }
      </p>
    </li>
  );
}