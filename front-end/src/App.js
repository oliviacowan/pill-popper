import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
// For testing:
// import ChildrenList from "./components/ChildrenList"
// import logo from './favicon.ico'


import './App.scss';

function App(props) {

  return (
    <main className="layout">
      <nav>
        < FontAwesomeIcon icon={faUsers} className="nav-icon" />
        <div>This is the app</div>
        < FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />
      </nav>
      <section>

      {/* For testing ChildrenList component */}

        {/* <ChildrenList children={[{id: 1, name: "Alex", avatar:logo, selected:1},
      {id: 2, name: "Andrew", avatar:logo, selected:1}, 
      {id: 3, name: "Jack", avatar:logo, selected:1}, 
      {id: 4, name: "Tilda", avatar:logo, selected:1}, 
      {id: 5, name: "Gary", avatar:logo, selected:1}]}
       /> */}

        {/* components here */}
      </section>
      <footer>
        <button>Add Medication</button>
      </footer>
    </main>
  );
}

export default App;
