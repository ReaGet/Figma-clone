export default {
  state: {
    comments: {
      1: {
        content: [
          {
            id: 1,
            text: "Test text",
            user: 1,
            created: new Date(),
          },
          {
            id: 2,
            text: "second test comment for marker #1",
            user: 2,
            created: new Date(),
          },
        ],
      },
      2: {
        content: [
          {
            id: 1,
            text: "Test text",
            user: 1,
            created: new Date(),
          },
          {
            id: 2,
            text: "second test comment for marker #1",
            user: 2,
            created: new Date(),
          },
          {
            id: 3,
            text: "Test t assdasdasdfadsfext",
            user: 3,
            created: new Date(),
          },
        ],
      },
      3: {
        content: [
          {
            id: 1,
            text: " asasdasdf aasdf text",
            user: 1,
            created: new Date(),
          },
          {
            id: 2,
            text: "second test comment for marker #1",
            user: 4,
            created: new Date(),
          },
        ],
      },
    },
  },
  getters: {
    getCommentsById: (state) => (markerId) => {
      return state.comments[markerId];
    },
  },
};
