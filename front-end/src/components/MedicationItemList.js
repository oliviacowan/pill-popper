import React from "react";
import MedicationItem from "./MedicationItem";

export default function MedicationItemList(props) {
  const medications = props.medications[0].medications;
 
  const medicationItemList = medications.map(
    medication => {
    
      const medStartDate = new Date(medication.start_date)
      const medEndDate = new Date(medication.end_date)
      const today = props.date
 
      if (medStartDate <= today && medEndDate >= today) {
    
     
       return (
        <MedicationItem
          key={medication.id}
          { ...medication }
          destroy={props.destroy}
          setDestroy={props.setDestroy}
        />
      )
       }
      }
       
  );

  return <>{medicationItemList}</>;
}
