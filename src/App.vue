<template>
  <router-view />
</template>

<script>
import "@/assets/index.scss";

export default {
  mounted() {
    const uid = 42 || +prompt("userId?");
    this.$store.commit("setCurrentUser", this.$store.getters.userById(uid));
  },
  computed: {},
};
</script>
