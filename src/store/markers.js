export default {
  state: {
    markers: [
      {
        id: 1,
        title: "#Этаж 1, прихожая",
        date: "02.12.2022",
        createdBy: 1,
        users: [1, 3],
      },
      {
        id: 2,
        title: "#Этаж 11, гостиная",
        date: "01.11.2022",
        createdBy: 3,
        users: [1, 2, 3],
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
