<template>
  <div ref="sidebar" class="sidebar" :class="{ open: isOpen }">
    <FilterComponent />
    <div class="markers__wrapper">
      <SidebarMarkerComponent
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  max-width: 300px;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  position: fixed;
  z-index: 20;
  right: -100%;
  top: 0;
  padding: 10px 10px 60px 10px;
  transition: right 0.2s ease-in-out;

  &.open {
    right: 0;
  }
}
.markers__wrapper {
  margin-top: 10px;
  padding-right: 10px;
  overflow-y: scroll;
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
import FilterComponent from "@/components/FilterComponent";
import SidebarMarkerComponent from "@/components/SidebarMarkerComponent";
export default {
  components: { SidebarMarkerComponent, FilterComponent },
  props: ["isOpen"],
  computed: {
    markers() {
      return this.$store.getters.markers;
    },
  },
};
</script>
