export default {
  state: {
    users: [
      {
        id: 1,
        name: "Rifat",
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
  },
};
