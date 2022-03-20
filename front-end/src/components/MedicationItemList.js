import React from "react";
import MedicationItem from "./MedicationItem";

const medications = [
  {
    name: "antibiotic",
    time: "4pm",
    id: 1,
    date: "03/20/2022",
  },
  {
    name: "tylenol",
    time: "3pm",
    id: 2,
    date: "11/19/2022",
  },
];

export default function MedicationItemList(props) {
  const medicationDate = props.date.toLocaleString().substring(0, 10);
  const zero = "0";

  const formatDate = function () {
    if (props.date.getMonth() < 10) {
      return zero.concat(medicationDate).slice(0, -1);
    } else {
      return medicationDate;
    }
  };

  const medicationItemList = medications.map(
    (medication) =>
      medication.date === formatDate(medicationDate) && (
        <MedicationItem
          key={medication.id}
          id={medication.id}
          time={medication.time}
          name={medication.name}
          date={medication.date}
        />
      )
  );

  return <>{medicationItemList}</>;
}
