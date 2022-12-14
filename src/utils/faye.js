import * as Faye from "../../node_modules/faye";
const client = new Faye.Client("http://localhost:8000/faye");
const subscriptions = [];
export default {
  subscribe(listener, fn) {
    subscriptions.push(client.subscribe(listener, fn));
  },
  send(listener, data) {
    client.publish(listener, data);
  },
  unsubscribeAll() {
    for (let i = 0; i < subscriptions.length; i++) {
      subscriptions[i].cancel();
      subscriptions.splice(i, 1);
      i--;
    }
  },
};
