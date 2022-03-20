import React from "react";
import MedicationItem from './MedicationItem'

const medications = [
  {
    name: 'antibiotic',
    time: '4pm',
    id: 1
  },
  {
    name: 'tylenol',
    time: '3pm',
    id: 2
  }
]


export default function MedicationItemList() {


  const medicationItemList = medications.map((medication) => (
   <MedicationItem 
      key={medication.id}
      id={medication.id}
      time={medication.time}
      name={medication.name}
      />

  ));

  return <>{medicationItemList}</>

}