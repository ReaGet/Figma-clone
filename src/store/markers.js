/* eslint-disable */
import {createLogger} from "vuex";

export default {
  state: {
    activeMarker: null,
    markers: [
      {
        id: 1,
        title: "#Этаж 1, прихожая",
        date: "02.12.2022",
        authorId: 1,
        users: [1, 2],
        firstComment: "First comment",
        position: {
          x: 100,
          y: 100,
        },
      },
      {
        id: 3,
        title: "#Этаж 3, прихожая",
        date: "02.12.2022",
        authorId: 4,
        users: [1, 4],
        firstComment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit
          amet, consectetur adipisicing elit.`,
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
        firstComment: "asdfasdf hasfdhasd comment",
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
    async getMarkers() {
      try {
        const markers = await fetch("http://db/markers/get/?project_id=0", {
          method: 'GET',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          }
        })
          .then((res) => res.json());
        return markers.data;
      } catch(e) {
        console.log(e);
      }
    },
    async createMarker({}, marker) {
      // console.log(JSON.stringify(marker));
      try {
        const result = await fetch("http://db/markers/create/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(marker),
        }).then((res) => res.json());
        result.position = JSON.parse(result.position);
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
