import { createStore } from "vuex";
import markers from "./markers";
import users from "./users";

export default createStore({
  state: {
    info: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { markers, users },
});
