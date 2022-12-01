<template>
  <div ref="sidebar" class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar__top filter">
      <div class="filter__wrapper">
        <div class="filter__input-wrapper">
          <input type="text" class="filter__input" />
        </div>
        <div class="filter__btn"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  max-width: 300px;
  width: 100%;
  height: 100vh;
  background-color: red;
  position: fixed;
  right: -100%;
  top: 0;
  padding: 10px;
  transition: right 0.2s ease-in-out;

  &.open {
    right: 0;
  }
}
</style>

<script>
export default {
  props: ["isOpen"],
  mounted() {
    console.log(this.isOpen);
  },
  methods: {
    open() {
      this.$refs.sidebar.classList.add("open");
    },
    close() {
      this.$refs.sidebar.classList.remove("open");
    },
    toggle() {
      this.$refs.sidebar.classList.toggle("open");
    },
  },
};
</script>
