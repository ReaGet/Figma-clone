export default {
  state: {
    currentProjectId: null,
    projects: [
      {
        id: 1,
        date: new Date(),
        authorId: 42,
        title: "Project 1",
      },
      {
        id: 2,
        date: new Date(),
        authorId: 42,
        title: "Project 2",
      },
    ],
  },
  mutations: {
    setCurrentProjectId(state, id) {
      state.currentProjectId = id;
    },
  },
  getters: {
    projects: (state) => state.projects,
    currentProjectId: (state) => state.currentProjectId,
  },
};
