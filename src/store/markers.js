/* eslint-disable */
import {createLogger} from "vuex";

export default {
  state: {
    activeMarker: null,
    markers: [
      {
        id: 1,
        title: "#Этаж 1, прихожая",
        created: "02.12.2022",
        authorId: 42,
        users: [42, 2],
        firstComment: "First comment",
        parentId: 1,
        position: {
          x: 100,
          y: 100,
        },
      },
      {
        id: 3,
        title: "#Этаж 3, прихожая",
        created: "02.12.2022",
        authorId: 4,
        users: [42, 4],
        firstComment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit.`,
        parentId: 1,
        position: {
          x: 300,
          y: 350,
        },
      },
      {
        id: 2,
        title: "#Этаж 11, гостиная",
        created: "01.11.2022",
        authorId: 3,
        users: [42, 2, 3],
        firstComment: "asdfasdf hasfdhasd comment",
        parentId: 2,
        position: {
          x: 500,
          y: 600,
        },
      },
    ],
  },
  mutations: {
    addMarker(state, marker) {
      if (Array.isArray(marker)) {
        state.markers.push(...marker);
        return;
      }
      state.markers.push(marker);
    },
  },
  actions: {
    async getMarkers({ commit }) {
      try {
        const markers = await fetch("http://figma.clone/markers/get/?projectId=0", {
          method: 'GET',
          mode: 'cors',
        })
        .then((res) => res.json());
        // commit("addMarker", markers);
      } catch(e) {
        console.log(e);
      }
    },
    async createMarker({}, marker) {
      // console.log(JSON.stringify(marker));
      return marker;
      const parse = (json) => JSON.parse(json);
      try {
        const result = await fetch("http://figma.clone/markers/create/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(marker),
        }).then((res) => res.json());
        result.position = parse(result.position);
        console.log(result);
        return result;
      } catch(e) {
        console.log(e);
      }
    },
  },
  getters: {
    markers: (state) => state.markers,
  },
};
