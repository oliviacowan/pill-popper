import "./ChildrenListItem.scss"
import classNames from 'classnames';

const ChildrenListItem = ({ id, name, avatar, selected, setChild }) => {

  const interviewerClass = classNames("children__item", {
    "children__item--selected": selected
  });
  return (
    <li className={interviewerClass} onClick={()=> setChild(id)}>
      <img
        className="children__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  )

}

export default ChildrenListItem


