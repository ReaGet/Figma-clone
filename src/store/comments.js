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
      state.comments[markerId].push({ commentId, text, authorId, created, markerId });
    },
    setComments(state, data) {
      // console.log($comments);
      // const comments = {};
      // data.comments.map(({ markerId, commentId, text, authorId, created}) => {
      //   if (!comments[markerId]) {
      //     comments[markerId] = [];
      //   }
      //   comments[markerId].push({ commentId, text, authorId, created, markerId });
      // });
      // state.comments = comments;
      state.comments[data.markerId] = data.comments;
    },
    updateComment(state, { markerId, text, commentId }) {
      const index = state.comments[markerId].findIndex((c) => c.commentId === commentId);
      console.log(markerId, text, commentId, index);
      Object.assign(state.comments[markerId][index], { "text": text });
      // Object.keys(comment).forEach((name) => {
      //   Object.assign(comment, { [name]: $comment[name] });
      // });
    },
    removeComment(state, comment) {
      state.comments[comment.markerId] = state.comments[comment.markerId].filter((c) => c.commentId !== comment.commentId);
    },
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
    async updateCommentRequest({}, comment) {
      try {
        const response = await fetch("http://figma.clone/comments/update/", {
          method: 'POST',
          mode: 'cors',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }).then((res) => res.json());
        if (response.result) {
          Faye.send("/comment/update", comment);
        }
      } catch(e) {
        console.log(e);
      }
    },
    async removeCommentRequest({ commit }, comment) {
      await fetch(`http://figma.clone/comments/remove/?commentId=${comment.commentId}`, {
        method: 'GET',
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.result) {
            console.log(response);
            Faye.send("/comment/remove", comment);
          }
        });
    },
    async loadComments({ commit }, markerId) {
      try {
        const comments = await fetch(`http://figma.clone/comments/get/?markerId=${markerId}`, {
          method: 'GET',
          mode: 'cors',
        }).then((res) => res.json());
        commit("setComments", { markerId, comments });
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
