import axios from "axios"
import { useState } from "react"
import "./ChildrenList.scss"

import ChildrenListItem from "./ChildrenListItem"

const ChildrenList = (props) => {
  const [name, setName] = useState("")
  const [color, setColor] = useState("")
  
  const addChild = function() {
    axios.post('/users/1/children/new', {
      name: name,
      avatar: color,
    })
    // console.log(name)
    .then(setName(''))
    .catch((err) => console.log(err))
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
    <h4 className="children__header text--light">F a m i l y - M e m b e r s</h4>
    <ul className="children__list">{parsedChildren}</ul>
    <form onSubmit={event => event.preventDefault()}>
          <input
            className="text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Name"
            onChange={(event) => setName(event.target.value)}
            avatar='text'
          />
             
           <select onChange={(event) => setColor(event.target.value)}> 
              <option value="one">Member colour</option>
              <option value="pink">Pink</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option> 
              <option value="yellow">Yellow</option> 
              <option value="purple">Purple</option> 
              <option value="neutral">Neutral</option> 
              <option value="light-blue">Light Blue</option> 
              </select>
        </form>
        <section className="children-actions">
        <button className="add-button" onClick={addChild} >Add</button>
        <button className="add-button" onClick={() => props.onChange("")}>View all</button>
        </section>
  </section>
)

}

export default ChildrenList