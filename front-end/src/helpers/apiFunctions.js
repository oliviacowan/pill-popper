// import { io } from "socket.io-client";
// const socket = io('ws://localhost:8081');
// socket.on("connect", () => { console.log('connected on client side') })
import axios from "axios";

export function searchApi(term, setSearch) {
  let data
  axios.get(`http://localhost:8081/fda/search/generic/${ term }`)
  .then((res) => { setSearch(res.data) });
}

