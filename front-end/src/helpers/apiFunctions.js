import { io } from "socket.io-client";
const socket = io('ws://localhost:8081');
socket.on("connect", () => { console.log('connected on client side') })

export function searchApi(term, setSearch) {
  console.log(term);
  // socket.on('error', () => {console.log('socket error')} )
  socket.emit('data', term);

  socket.on('search-data', (res) => { setSearch(res); });
}
