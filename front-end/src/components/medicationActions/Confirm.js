import React from "react";
import "./Confirm.scss";

export default function Confirm(props) {
  
  

  const cancel = function () {
    props.setDestroy(false);
  };

  return (
    <div className="confirm__card">
      <div className="message">Do you want to delete this item?</div>
      <div className="confirm__card--buttons--container">
        <button
          className="confirm__card--buttons"
          onClick={cancel}
        >
          Cancel
        </button>
        <button className="confirm__card--buttons" onClick={props.deleteMe} >Delete</button>
      </div>
    </div>
  );
}
