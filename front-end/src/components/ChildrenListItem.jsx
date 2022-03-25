import "./ChildrenListItem.scss"
import classNames from 'classnames';

const ChildrenListItem = ({ id, name, avatar, selected, setChild, color }) => {
  
  const childrenClass = classNames("children__item", {
    "children__item--selected": selected
  });
 
  let colorClass;
  if (color === "pink") {
    colorClass = "color__class--pink";
  } else if (color === 'purple') {
    colorClass = "color__class--purple";
  } else if (color === 'yellow'){
    colorClass = "color__class--yellow"
  } else if (color === 'green'){
    colorClass = "color__class--green"
  } else if (color === 'light-blue'){
    colorClass = "color__class--light-blue"
  } else if (color === 'neutral'){
    colorClass = "color__class--neutral"
  } else if (color === 'blue'){
    colorClass = "color__class--blue"
  }
  
  // const colorClass = classNames("color__class", {
  //   "color__class--pink": selected,
  //   "color__class--purple": selected,
  //   "color__class--purple": selected,
  // });
  return (
    <li className={childrenClass} onClick={()=> setChild(id)}>
      
      {/* <img
        className="children__item-image"
        src={avatar}
        alt={name}
      /> */}
      <div className={colorClass}></div>
      {name}
    </li>
  )

}

export default ChildrenListItem


