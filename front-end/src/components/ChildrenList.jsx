import axios from "axios"
import { useState } from "react"
import "./ChildrenList.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ChildrenListItem from "./ChildrenListItem"

const ChildrenList = (props) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  const [addAChild, setAddAChild] = useState(false)
  
  const addChild = function() {
    axios.post('http://localhost:8081/users/1/children/new', {
      name: name,
      avatar: color,
    })
    // console.log(name)
    .then(() => {
      setName('');
      setAddAChild(false); 
      props.loadChildren();
    })
    .catch((err) => console.log(err))
  }

  const doAddChild = () => {
    if (addAChild === true) {
      setAddAChild(false)
    } else {
      setAddAChild(true)
    }
  }

  
  const parsedChildren = props.children.map(child => {
  return (
    <ChildrenListItem
        key={child.id}
        name={child.name}
        color={child.avatar_url}
        // avatar={child.avatar_url}
        selected={child.id === props.value}   
        setChild={() => props.onChange(child.id)}
       />
        )
})

return (
 
  <section className="children">
    <h4 className="children__header text--light">F a m i l y - M e m b e r s </h4>
    <ul className="children__list">{parsedChildren}</ul>
    {addAChild && <form className="child-form" onSubmit={event => event.preventDefault()}>
          <input
            className="text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Name"
            onChange={(event) => setName(event.target.value)}
            avatar='text'
          />
             
           <select className="select-color" onChange={(event) => setColor(event.target.value)}> 
              <option value="one">Member colour</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option> 
              <option value="yellow">Yellow</option> 
              <option value="purple">Purple</option> 
              <option value="neutral">Neutral</option> 
              <option value="light-blue">Light Blue</option> 
              </select>
              <button className="add-button" type="button" onClick={addChild} >Add</button>
        </form>}
        <section className="children-actions">
        {/* <button className="add-button" onClick={addChild} >Add</button> */}
        <button className="add-button" onClick={doAddChild} ><i className="fa-solid fa-person-circle-plus"></i></button>
        <button className="add-button" onClick={() => props.onChange("")}>View all</button>
        </section>
    <button className='close-component' onClick={ () => props.transition('NONE') } >
        <FontAwesomeIcon icon={faXmark } />
    </button>
  </section>
)

}

export default ChildrenList