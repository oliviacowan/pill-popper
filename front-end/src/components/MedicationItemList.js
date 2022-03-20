import React from "react";
import MedicationItem from "./MedicationItem";

const medications = [
  {
    name: "antibiotic",
    time: "4pm",
    id: 1,
    date: "03/20/2022",
    child: 3
  },
  {
    name: "tylenol",
    time: "3pm",
    id: 2,
    date: "11/19/2022",
    child: 2
  },
];

export default function MedicationItemList(props) {
  // turn date into string, take substring of first 10 values
  const medicationDate = props.date.toLocaleString().substring(0, 10);
  // declare 0 to concat to if needed
  const zero = "0";

  const formatDate = function () {
    // check if month is only one character long
    if (props.date.getMonth() < 10) {
      // if it is, add zero to beginning and remove trailing space
      return zero.concat(medicationDate).slice(0, -1);
    } else {
      // otherwise, return string as is
      return medicationDate;
    }
  };


  const medicationItemList = medications.map(
    (medication) => props.children.map((child) => 
      child.id === medication.child &&
      medication.date === formatDate(medicationDate) && (
        <MedicationItem
          key={medication.id}
          id={medication.id}
          time={medication.time}
          name={medication.name}
          child={child.name}
          // date={medication.date}
        />
      )
    )
  );

  return <>{medicationItemList}</>;
}
