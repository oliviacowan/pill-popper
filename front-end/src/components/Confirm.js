import React from "react";
import './Confirm.scss';

export default function Confirm(props) {


  return (
    <div className="confirm__card">
      <div className="message">
        Are you sure you want to delete this item?
      </div>
      <div className="confirm__card--buttons--container">
      <button className="confirm__card--buttons">Cancel</button>
      <button className="confirm__card--buttons">Delete</button>
      </div>
    </div>
    )
}