import react from 'react';
import './MedicationItem.scss'
export default function MedicationItem() {

  function getInfo() {
    console.log('clicked info icon')
  }
  function destroy() {
    console.log('clicked delete icon')
  }
  function edit() {
    console.log('clicked edit icon')
  }

  return (
  <li className='medication-item'>
    
   <div className='medication-time-name'>
      <p className='scheduled-time'>time</p>
      <h2 className='medication-name'>Medication Name</h2>
    </div>
    <section className='medication-item-icons'>
      <p onClick={edit}><i className="fa-solid fa-user-pen"></i></p> 
      <p onClick={destroy}><i className="fa-solid fa-trash"></i> </p>
      <p onClick={getInfo}><i className="fa-solid fa-circle-info"></i></p>
    </section>
  </li>
  )
}