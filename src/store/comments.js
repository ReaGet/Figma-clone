/* eslint-disable */
import Faye from "@/utils/faye";

export default {
  state: {
    comments: {
      33: [
        {
          commentId: 1,
          text: "Test text",
          authorId: 1,
          created: new Date(),
        },
        {
          commentId: 2,
          text: "second test comment for marker #1",
          authorId: 2,
          created: new Date(),
        },
      ],
    },
  },
  mutations: {
    addComment(state, { markerId, commentId, text, authorId, created }) {
      if (!state.comments[markerId]) {
        state.comments[markerId] = [];
      }
      state.comments[markerId].push({ commentId, text, authorId, created });
    },
    setComments(state, $comments) {
      const comments = {};
      $comments.map(({ markerId, commentId, text, authorId, created}) => {
        if (!comments[markerId]) {
          comments[markerId] = [];
        }
        comments[markerId].push({ commentId, text, authorId, created });
      });
      state.comments = comments;
    }
  },
  actions: {
    async addCommentRequest({}, comment) {
      try {
        const result = await fetch("http://figma.clone/comments/create/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }).then((res) => res.json());
        Faye.send("/comment/add", result);
        return result;
      } catch(e) {
        console.log(e);
      }
    },
    async updateCommentRequest({}, data) {
      try {
        const result = await fetch("http://figma.clone/comments/update/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => res.json());
        // Faye.send("/comment/add", result);
        return result;
      } catch(e) {
        console.log(e);
      }
    },
    async loadComments({ commit }, markerId) {
      try {
        const comments = await fetch(`http://figma.clone/comments/get/?markerId=${markerId}`, {
          method: 'GET',
          mode: 'cors',
        }).then((res) => res.json());
        commit("setComments", comments);
      } catch(e) {
        console.log(e);
      }
    },
  },
  getters: {
    getCommentsById: (state) => (markerId) => {
      return state.comments[markerId];
    },
  },
};
