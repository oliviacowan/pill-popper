import {  Marker } from '@react-google-maps/api';

import React from 'react';


export default function Pin({data, setSelectedPharmacy, selectedPharmacy}) {


return (
<>
  { data && data[0].data.map((store) => (
  <Marker 
  key={store.place_id} 
  position={{lat: store.geometry.location.lat, lng: store.geometry.location.lng}} 
  onClick={() => {setSelectedPharmacy(store); console.log('dis: ', typeof store.geometry.location.lng)}}
  // label: {text: `${id}`, color: "blue"}
  />
  ))}
  </>
)
}