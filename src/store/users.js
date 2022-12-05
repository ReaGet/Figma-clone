export default {
  state: {
    currentId: 1,
    users: [
      {
        id: 1,
        name: "Рифат",
        image: null,
      },
      {
        id: 4,
        name: "Настюша",
        image: null,
      },
      {
        id: 2,
        name: "Rishat",
        image: null,
      },
      {
        id: 3,
        name: "Sabina",
        image: null,
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
