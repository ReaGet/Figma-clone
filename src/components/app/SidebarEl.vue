<template>
  <div
    ref="sidebar"
    class="sidebar"
    :class="{ open: isOpen, right: right, left: left }"
  >
    <slot />
  </div>
</template>

<style lang="scss">
.sidebar {
  max-width: 300px;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  position: fixed;
  z-index: 40;
  top: 0;
  padding: 10px 10px 60px 10px;
  transition: right 0.2s ease-in-out, left 0.2s ease-in-out;

  &.right {
    right: -100%;
    &.open {
      right: 0;
    }
  }

  &.left {
    left: -100%;
    &.open {
      left: 0;
    }
  }
}
.markers__wrapper {
  margin-top: 10px;
  padding-right: 10px;
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;
  }
}
</style>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
