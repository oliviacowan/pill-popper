import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Calendar from './components/Calendar'
// For testing:
import ChildrenList from "./components/ChildrenList"
import logo from './favicon.ico'


import './App.scss';

import Form from './components/Form'
import Status from './components/Status'

function App(props) {
  const [viewCalendar, setViewCalendar] = useState(false);
  const [viewUser, setViewUser] = useState(true);
    
  const calendarBoolean = function() {
      if (viewCalendar) {
        setViewCalendar(false)
      } else{
        setViewCalendar(true)
      }
    }
  const userListBoolean = function() {
    if (viewUser) {
      setViewUser(false)
    } else{
      setViewUser(true)
    }
  }
  
  

  return (
    <main className="layout">
      <nav>
        < FontAwesomeIcon icon={faUsers} className="nav-icon" onClick={userListBoolean} />
        <div>This is the app</div>
        < FontAwesomeIcon icon={faCalendarDays} className="nav-icon" onClick={calendarBoolean}/>
      </nav>

      <section className="component">
         
          {viewUser && <ChildrenList children={[
            {id: 1, name: "Alex", avatar:logo, selected:1},
            {id: 2, name: "Andrew", avatar:logo, selected:1}, 
            {id: 3, name: "Jack", avatar:logo, selected:1}, 
            {id: 4, name: "Tilda", avatar:logo, selected:1}, 
            {id: 5, name: "Gary", avatar:logo, selected:1}
          ]}/>}
          {viewCalendar && <Calendar />}
        < Form />
        {/* components here */}
       {/* <Calendar /> */}
      </section>
      <footer>
        <button>Add Medication</button>
      </footer>
    </main>
  );
}

export default App;
