// import { io } from "socket.io-client";
// const socket = io('ws://localhost:8081');
// socket.on("connect", () => { console.log('connected on client side') })
import axios from "axios";

export function searchApi(searchTerm, setSearch) {
  const resArray = [];
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchTerm}"&limit=2`)
      .then((response) => {
          response.data.results.forEach(result => {
            console.log('Generic');
            resArray.push({ id: [result.id][0], name: result.openfda.brand_name[0]});
          })
          console.log("SEARCHED ARRAY: ", resArray)
          setSearch(resArray);
        }, (res) => { axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${searchTerm}"&limit=2`)
        .then((response) => {
            response.data.results.forEach(result => {
              console.log('Generic');
              resArray.push({ id: [result.id][0], name: result.openfda.generic_name[0]});
            })
            setSearch(resArray)
          })
           .catch(() => { console.log("ERRROOOOORRR!") });
        }
      
      )}

