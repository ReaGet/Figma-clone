<template>
  <button
    @click="this.isMarkersSidebarOpen = !this.isMarkersSidebarOpen"
    style="position: absolute; z-index: 10"
  >
    Markers
  </button>
  <button
    @click="this.isUsersSidebarOpen = !this.isUsersSidebarOpen"
    style="position: absolute; z-index: 10; left: 30%"
  >
    Users
  </button>
  <ContentEl />
  <SidebarEl :isOpen="isUsersSidebarOpen" :left="true"></SidebarEl>
  <SidebarEl :isOpen="isMarkersSidebarOpen" :right="true">
    <FilterComponent />
    <div class="markers__wrapper">
      <SidebarMarkerComponent
        v-for="marker in markers.slice().reverse()"
        :key="marker.id"
        :marker="marker"
      />
    </div>
  </SidebarEl>
</template>

<script>
import SidebarEl from "@/components/app/SidebarEl";
import ContentEl from "@/components/app/ContentEl.vue";
import SidebarMarkerComponent from "@/components/SidebarMarkerComponent";
import FilterComponent from "@/components/FilterComponent";

export default {
  components: {
    SidebarEl,
    ContentEl,
    SidebarMarkerComponent,
    FilterComponent,
  },
  data: () => ({
    isUsersSidebarOpen: false,
    isMarkersSidebarOpen: true,
    comments: null,
  }),
  computed: {
    markers() {
      return this.$store.getters.markers;
    },
  },
};
</script>
