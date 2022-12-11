import { createStore } from "vuex";
import markers from "./markers";
import users from "./users";
import comments from "./comments";
import projects from "./projects";

export default createStore({
  state: {
    info: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: { markers, users, comments, projects },
});
