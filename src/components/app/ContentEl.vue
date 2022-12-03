<template>
  <div class="content" @click="handleContentClick">
    <div>canvas</div>
    <MarkerComponent
      :marker="{ position, isCreating }"
      v-if="isCreating"
      @submitMarker="submitMarker"
      @cancelMarker="cancelMarker"
    />
    <MarkerComponent
      v-for="marker in markers"
      :key="marker.id"
      :marker="marker"
      @markerClick="handleMarkerClick"
    />
  </div>
</template>

<style lang="scss">
.content {
  position: relative;
  background-color: #aaa;
  height: 100vh;
}
</style>

<script>
import MarkerComponent from "@/components/MarkerComponent.vue";

export default {
  components: { MarkerComponent },
  data: () => ({
    isCreating: false,
    position: {},
  }),
  computed: {
    markers() {
      return this.$store.getters.markers;
    },
  },
  methods: {
    handleMarkerClick(marker) {
      console.log(marker);
    },
    handleContentClick(event) {
      this.isCreating = !this.isCreating;
      this.position = this.getPosition(event);
    },
    submitMarker() {
      this.isCreating = false;
      const marker = this.createMarker();
      this.$store.commit("addMarker", marker);
    },
    createMarker() {
      const currentId = this.$store.getters.currentId;
      return {
        id: ~~(Math.random() * 100),
        title: "#Этаж 1, прихожая",
        date: "02.12.2022",
        authorId: currentId,
        users: [currentId],
        state: "creating",
        position: this.position,
      };
    },
    cancelMarker() {
      this.isCreating = false;
    },
    getPosition(event) {
      return {
        x: event.pageX - 17,
        y: event.pageY - 17,
      };
    },
  },
};
</script>
