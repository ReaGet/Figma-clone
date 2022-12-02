export default {
  state: {
    users: [
      {
        id: 1,
        name: "Rifat",
      },
      {
        id: 2,
        name: "Rishat",
      },
      {
        id: 3,
        name: "Sabina",
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
