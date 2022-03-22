import TimePicker from 'react-time-picker'

const Time = (props) => {
  
  return (
    <TimePicker onChange={props.setTime} value={props.time} disableClock={true} />
  )
}

export default Time