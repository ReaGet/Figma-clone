<template>
  <router-view />
</template>

<script>
import "@/assets/index.scss";

export default {
  mounted() {
    this.$store.commit("setCurrentUser", this.$store.getters.userById(42));
  },
  computed: {},
};
</script>
