import React from "react";
import MedicationItem from "./MedicationItem";

// const medications = [
//   {
//     name: "antibiotic",
//     time: "4pm",
//     id: 1,
//     date: "03/21/2022",
//     child: 3
//   },
//   {
//     name: "tylenol",
//     time: "3pm",
//     id: 2,
//     date: "11/19/2022",
//     child: 2
//   },
//   {
//     name: "advil",
//     time: "3pm",
//     id: 3,
//     date: "03/21/2022",
//     child: 2
//   },
// ];

export default function MedicationItemList(props) {
  // turn date into string, take substring of first 10 values
  // const medicationDate = props.date.toLocaleString().substring(0, 10);
  // // declare 0 to concat to if needed
  // const zero = "0";

  // const formatDate = function () {
  //   // check if month is only one character long
  //   if (props.date.getMonth() < 10) {
  //     // if it is, add zero to beginning and remove trailing space
  //     return zero.concat(medicationDate).slice(0, -1);
  //   } else {
  //     // otherwise, return string as is
  //     return medicationDate;
  //   }
  // };
  const medications = props.medications[0].medications;
  // const medications = props.medications

  const medicationItemList = medications.map(
    (medication) => 
    // {
    //   console.log('med: ', {...medication});
      // console.log('medication: ', medication);
      // const date = new Date('2022-03-20T07:00:00.000Z').toString().substring(0,10);
      // const medicationDate = new Date(medication.start_date).toString().substring(0,10)
      // const today = props.date.toString().substring(0,10)
      // if (medicationDate === today) {
      //   console.log('here')
      
      // console.log(date);
      
      //get time 
      // console.log(props.date.toString().substring(16, 21))
      // const time = medication.start_date.toString().substring(16,21)


      // console.log('plain: ', props.medications);
      // console.log('zero: ', props.medications[0].medications);
       (
        <MedicationItem
          key={medication.id}
          // id={medication.id}
          // time={time}
          // name={medication.name}
          // child={child.name}
          { ...medication }
          destroy={props.destroy}
          setDestroy={props.setDestroy}
          // date={medication.date}
        />
      )
      // }
      //  }
  );

  return <>{medicationItemList}</>;
}
