
import "./MedicationItem.scss";


export default function MedicationItem({ time, name, id, child}) {
  
  function getInfo() {
    console.log("clicked info icon", id);
  }
  function destroy() {
    console.log("clicked delete icon", id);
  }
  function edit() {
    console.log("clicked edit icon", id);
  }

  return (
    <li className="medication-item">
      <div className="medication-time-name">
        <p className="scheduled-time">{time}   <i class="fa-solid fa-arrow-right-long"></i>   {child}</p>
        <h2 className="medication-name">{name}</h2>
      </div>
      <section className="medication-item-icons">
        <p onClick={edit}>
          <i className="fa-solid fa-user-pen"></i>
        </p>
        <p onClick={destroy}>
          <i className="fa-solid fa-trash"></i>{" "}
        </p>
        <p onClick={getInfo}>
          <i className="fa-solid fa-circle-info"></i>
        </p>
      </section>
    </li>
  );
}
