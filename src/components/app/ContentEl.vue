<template>
  <div class="content" @click="handleContentClick">
    <div>canvas</div>
    <div class="markers">
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
        @cancelMarker="cancelMarker"
      />
    </div>
  </div>
</template>

<style lang="scss">
.content {
  position: relative;
  background-color: #aaa;
  height: 100vh;
}
.markers {
  position: absolute;
}
</style>

<script>
import MarkerComponent from "@/components/MarkerComponent.vue";
import dateFilter from "@/mixins/dateMixin";

export default {
  components: { MarkerComponent },
  mixins: [dateFilter],
  data: () => ({
    isCreating: false,
    position: {},
    clickedMarker: null,
  }),
  async mounted() {
    const markers = await this.$store.dispatch("getMarkers");
    console.log(markers);
  },
  computed: {
    markers() {
      return this.$store.getters.markers;
    },
  },
  methods: {
    handleMarkerClick(marker) {
      this.clickedMarker = marker;
      this.isCreating = false;
    },
    handleContentClick(event) {
      if (this.clickedMarker) {
        return;
      }
      this.isCreating = !this.isCreating;
      this.position = this.getPosition(event);
    },
    async submitMarker(data) {
      this.isCreating = false;
      const marker = await this.$store.dispatch(
        "createMarker",
        this.createMarker(data)
      );
      this.$store.commit("addMarker", marker);
    },
    createMarker(data) {
      const currentId = this.$store.getters.currentId;
      const users = [currentId];
      if (data.sendTo && data.sendTo.id > -1 && !users.includes(data.sendTo)) {
        users.push(data.sendTo.id);
      }
      return {
        // id: ~~(Math.random() * 100),
        title: "#Этаж 1, прихожая",
        date: this.dateFilter(new Date()),
        authorId: currentId,
        projectId: 0,
        // users: users,
        firstComment: data.comment,
        position: this.position,
      };
    },
    cancelMarker() {
      this.isCreating = false;
      this.clickedMarker = null;
    },
    getPosition(event) {
      return {
        x: event.pageX - 12,
        y: event.pageY - 12,
      };
    },
  },
};
</script>
