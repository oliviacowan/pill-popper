import React from "react";
import MedicationItem from "./MedicationItem";

export default function MedicationItemList(props) {
  const medications = props.medications[0].medications;

  const medicationItemList = medications.map((medication) => {

    const medStartDate = new Date(medication.start_date);
    const medEndDate = new Date(medication.end_date);
    const today = props.date;
    
    
    for (let child in props.childrenState) {
      const childObj = props.childrenState[child];
      if (medStartDate <= today && medEndDate >= today) {

        if (props.childState && props.childState === childObj.id && childObj.id === medication.child_id) {
          console.log('hereeee');
          console.log(childObj.name)
          return (
            <MedicationItem
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
            />
          );
        }

        else if (!props.childState && childObj.id === medication.child_id) {

          return (
            <MedicationItem
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
            />
          );
        }
      }
    }
  });

  return <>{medicationItemList}</>;
}
