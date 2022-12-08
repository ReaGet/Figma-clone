export default {
  state: {
    currentId: 42,
    users: [
      {
        id: 1,
        name: "Рифат",
        image: null,
        role: 1,
      },
      {
        id: 4,
        name: "Настя",
        image: null,
        role: 1,
      },
      {
        id: 2,
        name: "Rishat",
        image: null,
        role: 1,
      },
      {
        id: 3,
        name: "Sabina",
        image: null,
        role: 1,
      },
    ],
  },
  actions: {
    getUserById(uid) {
      console.log(uid);
    },
  },
  getters: {
    users: (state) => state.users,
    currentId: (state) => state.currentId,
  },
};
