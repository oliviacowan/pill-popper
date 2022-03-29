// import { io } from "socket.io-client";
// const socket = io('ws://localhost:8081');
// socket.on("connect", () => { console.log('connected on client side') })
import axios from "axios";

export function searchApi(searchTerm, setSearch) {
  const resObj = {};
    axios.get(`https://api.fda.gov/drug/label.json?search=openfda.generic_name:"${searchTerm}"&limit=2`)
      .then((response) => {
          response.data.results.forEach(result => {
            console.log('Generic');
            resObj[result.id] = result.openfda.generic_name
          })
          setSearch(resObj);
        })
      .catch(() => { console.log("ERRROOOOORRR!") });
}

