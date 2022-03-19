import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHolding, faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons';
import './Status.scss';

export default function Status(props) {
  
  return (
    <section className="status__card">
      <h1>LOADING/SAVING</h1>
      <div className="animated">
        <div className="bottle-container">
          <FontAwesomeIcon icon={faPrescriptionBottleMedical} className="status-icon bottle"/>
        </div>
        <div className="hand-container">
          <FontAwesomeIcon icon={faHandHolding} className="status-icon hand"/>
        </div>
      </div>
    </section>
  );
}