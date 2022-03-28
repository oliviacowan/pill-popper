import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pin from './Pin';


const MapContainer = () => {
  const [ currentPosition, setCurrentPosition ] = useState({});
  const [data, setData] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  
  console.log('data;;;; ', data)
  
  
  
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  
  useEffect(() => {
    
  axios.get(`/json?location=${currentPosition.lat},${currentPosition.lng}&radius=2000&types=pharmacy&key=AIzaSyAQ4OMkMyiWa-0keG1Wu3xENtDWJNc9qRQ`)
 
  .then((res) => {
    setData((prev) => [
      {
        ...prev, 
        data: res.data.results
      },
    ]);
   
  })
  
  .catch((error) => {console.log(error)})
}, [currentPosition])
  
console.log('dataaaaa:::: ', data)
  console.log('current: ', currentPosition.lng);



  const mapStyles = {        
    height: "20em",
    width: "90%",
  };
  
  
  return (
    <LoadScript
    googleMapsApiKey='AIzaSyAQ4OMkMyiWa-0keG1Wu3xENtDWJNc9qRQ'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          center={currentPosition}>
            <Pin data={data} setData={setData} setSelectedPharmacy={setSelectedPharmacy} selectedPharmacy={selectedPharmacy}/>
            <Marker 
            key="me" 
            position={{lat: currentPosition.lat, lng: currentPosition.lng}} 
            />
            {selectedPharmacy && (
           <InfoWindow
           position={{lat: selectedPharmacy.geometry.location.lat, lng: selectedPharmacy.geometry.location.lng}} 
           onCloseClick={() => {setSelectedPharmacy(null)}}
           >
             <div>
             <h4>{selectedPharmacy.name}</h4>

             <p>{selectedPharmacy.vicinity}</p>
             {selectedPharmacy.opening_hours.open_now ? <p>Open Now</p> : <p>Currently closed</p>}
             <p>Rating: {selectedPharmacy.rating}</p>
             </div>
           </InfoWindow>)}
          </GoogleMap>
     </LoadScript>
       )
      }
      
      export default MapContainer;
