<template>
  <FilterComponent @filterInput="handleFilterInput" />
  <div class="markers__wrapper">
    <SidebarMarkerComponent
      v-for="marker in filteredMarkers.slice().reverse()"
      :key="marker.markerId"
      :marker="marker"
      @markerClick="handleMarkerClick"
    />
  </div>
</template>

<script>
import SidebarMarkerComponent from "@/components/marker/SidebarMarkerComponent.vue";
import FilterComponent from "@/components/FilterComponent";

export default {
  components: { SidebarMarkerComponent, FilterComponent },
  props: ["markers"],
  emits: ["markerClick"],
  data: () => ({
    filterText: "",
  }),
  computed: {
    filteredMarkers() {
      return this.markers.filter((marker) => {
        if (!this.filterText) {
          return this.markers;
        }
        const user = this.$store.getters.userById(marker.authorId);
        return user.name.toLowerCase().includes(this.filterText);
      });
    },
  },
  methods: {
    handleFilterInput(text) {
      this.filterText = text.trim().toLowerCase();
    },
    handleMarkerClick(marker) {
      this.$emit("markerClick", marker);
    },
  },
};
</script>
