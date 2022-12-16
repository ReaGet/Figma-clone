export default {
  methods: {
    substring(value, length) {
      const cutted = value.substring(0, length);
      return `${cutted}${cutted.length < value.length ? "..." : ""}`;
    },
  },
};
