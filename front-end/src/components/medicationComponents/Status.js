import React from 'react';
import './status.scss'

export default function Status(props) {
  const statusClassName = props.color + ' info-status'
  return (
    <li className={statusClassName}>
      <div class="lds-default">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </li>
  );
}