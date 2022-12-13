import * as Faye from "../../node_modules/faye";
const client = new Faye.Client("http://localhost:8000/faye");
console.log(client);
export default {
  subscribe(listener, fn) {
    client.subscribe(listener, fn);
  },
  send(listener, data) {
    client.publish(listener, data);
  },
};
