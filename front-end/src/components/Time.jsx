import TimePicker from 'react-time-picker'
import './TimePicker.css'

const Time = (props) => {
  
  return (
    <TimePicker onChange={props.setTime} value={props.time} disableClock={true} />
  )
}

export default Time