import CalendarComponent from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useState} from 'react'

const Calendar = () => {

  const [value, onChange] = useState(new Date());

return (
  <> 
  <CalendarComponent onChange={onChange} value={value}/>
  </>
)
}


export default Calendar