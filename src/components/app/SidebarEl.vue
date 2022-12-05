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
  right: -100%;
  top: 0;
  padding: 10px;
  transition: right 0.2s ease-in-out;

  &.open {
    right: 0;
  }
}
.markers__wrapper {
  padding: 10px 0;
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
