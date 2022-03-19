import "./ChildrenListItem.scss"

const ChildrenListItem = ({ name, avatar, selected, setChildren }) => {

  // const interviewerClass = classNames("interviewers__item", {
  //   "interviewers__item--selected": selected
  // });

  return (
    <li className="children__item" onClick={setChildren}>
      <img
        className="children__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  )

}

export default ChildrenListItem


