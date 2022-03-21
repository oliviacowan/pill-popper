import CalendarComponent from 'react-calendar'
import './Calendar.scss';
import {useState} from 'react'

const Calendar = ({value, onChange}) => {

  // const [value, onChange] = useState(new Date());

  return (
  <> 
  <CalendarComponent onChange={onChange} value={value} calendarType='US'/>
  </>
)

}

export default Calendar