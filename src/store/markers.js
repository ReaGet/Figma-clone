/* eslint-disable */
import Faye from "@/utils/faye";

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
    setMarkers(state, markers) {
      if (!Array.isArray(markers)) {
        return;
      }
      state.markers = markers;
    },
    removeMarker(state, markerId) {
      state.markers = state.markers.filter((marker) => {
        return marker.markerId != markerId;
      });
    },
    setMarkerOpen(state, { markerId, value }) {
      const index = state.markers.findIndex((marker) => marker.markerId === markerId);
      Object.assign(state.markers[index], { opened: value });
    },
    updateMarker(state, { markerId, value }) {
      const index = state.markers.findIndex((marker) => marker.markerId === markerId);
      Object.assign(state.markers[index], { commentsCount: value });
    },
  },
  actions: {
    async getMarkers({ commit, getters }) {
      try {
        const projectId = getters.currentProjectId;
        const markers = await fetch(`http://figma.clone/markers/get/?projectId=${projectId}`, {
          method: 'GET',
          mode: 'cors',
        })
        .then((res) => res.json());
        markers.map((marker) => marker.position = JSON.parse(marker.position));
        commit("setMarkers", markers);
      } catch(e) {
        console.log(e);
      }
    },
    async addMarkerRequest({}, marker) {
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
        Faye.send("/marker/add", result);

        return result;
      } catch(e) {
        console.log(e);
      }
    },
    async removeMarker({ commit }, markerId) {
      await fetch(`http://figma.clone/markers/delete/?markerId=${markerId}`, {
        method: 'GET',
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.result) {
            // commit("removeMarker", markerId);
            Faye.send("/marker/remove", markerId);
          }
        });
    },
  },
  getters: {
    markers: (state) => state.markers,
  },
};
