import React, { Fragment } from "react";
import axios from "axios";
import MedicationItem from "./MedicationItem";

export default function MedicationItemList(props) {

  const medications = props.medications[0].medications;

  console.log("MEDICATION", medications)
  const medicationItemList = medications.map((medication) => {
    const deleteMe = function () {
      axios.delete(`http://localhost:8081/medications/${medication.id}/delete`)
        .then(() => {
          props.setMedications((prev) => [{ ...prev, medications: props.medications[0].medications.filter(med => med.id !== medication.id) }])
        })
    }
    const medEndDate = (medication) => {
      if (medication.end_date) {
        return new Date(medication.end_date)
      } else {
        return new Date()
      }
    }

    console.log("medication.start_date", medication.start_date)
    let startDate = medication.start_date
    const medStartDate =  new Date(medication.start_date)

  let currDate = props.date
  let today = new Date(currDate.getTime() + 2 * 60000)
//   if(props.today){
//         const currDate = props.today
// return new Date(currDate.getTime() + 2 * 60000)
//   } else {
//     const currDate = props.today
// return new Date(currDate.getTime() + 2 * 60000)
//   }
//   }
    // const medEndDate = var minutesToAdd=30;

;
     
    // const today = new Date(new Date().getTime() + 2 * 60000)
    console.log("MEDICATION", medication) // here exists
    console.log("DATE", props.date)
    console.log("medEndDate(medication)", medEndDate(medication))
    console.log("medStartDate", medStartDate)


    for (let child in props.childrenState) {

      // console.log("color", props.childrenState[child].avatar_url);
      const childObj = props.childrenState[child];
      if (medStartDate <= props.date && medEndDate(medication) >= props.date) {
        console.log("FIRST IF", medication)
        if (props.childState && props.childState === childObj.id && childObj.id === medication.child_id) {
          console.log("SECOND ELSE MEDICATOON", medication) // with food null

          return (
            <MedicationItem
              color={childObj.avatar_url}
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
              onEdit={() => { props.edit(medication) }}
            />
          );
        }

        else if (!props.childState && childObj.id === medication.child_id) {
          console.log("THERD ELSE MEDICATOONS", medication) // here no exists
          return (
            <MedicationItem
              color={childObj.avatar_url}
              key={medication.id}
              {...medication}
              destroy={props.destroy}
              setDestroy={props.setDestroy}
              child={childObj.name}
              deleteMe={deleteMe}
              onEdit={() => { props.edit(medication) }}
            />
          );
        }
      }
    }
  });

  return <>{medicationItemList}</>;
}
