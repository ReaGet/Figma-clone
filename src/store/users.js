export default {
  state: {
    currentId: 42,
    currentUser: null,
    users: [
      {
        id: 42,
        name: "Рифат",
        image: null,
        permissions: ["deleteMarker"],
      },
      {
        id: 4,
        name: "Настя",
        image: null,
        role: 2,
        permissions: [],
      },
      {
        id: 2,
        name: "Rishat",
        image: null,
        role: 2,
        permissions: [],
      },
      {
        id: 3,
        name: "Sabina",
        image: null,
        role: 2,
        permissions: [],
      },
    ],
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {},
  getters: {
    users: (state) => state.users,
    currentId: (state) => state.currentId,
    currentUser: (state) => state.currentUser,
    userById: (state) => (id) => state.users.find((user) => user.id === id),
    can: (state) => (perm) => state.currentUser.permissions.includes(perm),
  },
};
