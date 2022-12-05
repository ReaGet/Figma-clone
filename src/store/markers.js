export default {
  state: {
    markers: [
      {
        id: 1,
        title: "#Этаж 1, прихожая",
        date: "02.12.2022",
        authorId: 1,
        users: [1, 2],
        position: {
          x: 100,
          y: 100,
        },
      },
      {
        id: 5,
        title: "#Этаж 3, прихожая",
        date: "02.12.2022",
        authorId: 4,
        users: [1, 2],
        position: {
          x: 300,
          y: 350,
        },
      },
      {
        id: 2,
        title: "#Этаж 11, гостиная",
        date: "01.11.2022",
        authorId: 3,
        users: [1, 2, 3],
        position: {
          x: 500,
          y: 600,
        },
      },
    ],
  },
  mutations: {
    addMarker(state, marker) {
      state.markers.push(marker);
    },
  },
  actions: {
    async getMarkers() {},
  },
  getters: {
    markers: (state) => state.markers,
  },
};
