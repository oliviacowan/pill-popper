import "./ChildrenList.scss"

import ChildrenListItem from "./ChildrenListItem"

const ChildrenList = (props) => {
  

  
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
            type="text"
            placeholder="Enter Name"
            onChange={null}
            avatar='text'
          />
        </form>
        
        <button className="add-button">Add</button>
  </section>
)

}

export default ChildrenList