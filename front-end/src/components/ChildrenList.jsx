import axios from "axios"
import { useState } from "react"
import "./ChildrenList.scss"

import ChildrenListItem from "./ChildrenListItem"

const ChildrenList = (props) => {
  const [name, setName] = useState("")
  
  const addChild = function() {
    axios.post('/users/1/children/new', {
      name: name,
      avatar: 'https://img.favpng.com/1/10/3/computer-icons-child-avatar-png-favpng-1KY4gtPN1Fab6LrVpVM8AjtnH.jpg',
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
        avatar={child.avatar_url}
        selected={child.id === props.value}   
        setChild={() => props.onChange(child.id)}
       />
        )
})

return (
 
  <section className="children">
    <h4 className="children__header text--light">Children</h4>
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
        </form>
        <section className="children-actions">
        <button className="add-button" onClick={addChild} >Add</button>
        <button className="add-button" onClick={() => props.onChange("")}>View all</button>
        </section>
  </section>
)

}

export default ChildrenList