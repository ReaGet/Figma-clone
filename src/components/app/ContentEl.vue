<template>
  <div class="content" @click="handleContentClick">
    <div>canvas</div>
    <MarkerComponent
      :marker="{ position, isCreating }"
      v-if="isCreating"
      @submitMarker="submitMarker"
      @cancelMarker="cancelMarker"
    />
    <div class="markers">
      <MarkerComponent
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        @markerClick="handleMarkerClick"
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
    submitMarker(data) {
      this.isCreating = false;
      const marker = this.createMarker(data);
      this.$store.commit("addMarker", marker);
    },
    createMarker(data) {
      const currentId = this.$store.getters.currentId;
      const users = [currentId];
      if (data.sendTo && data.sendTo.id > -1 && !users.includes(data.sendTo)) {
        users.push(data.sendTo.id);
      }
      return {
        id: ~~(Math.random() * 100),
        title: "#Этаж 1, прихожая",
        date: this.dateFilter(new Date()),
        authorId: currentId,
        users: users,
        state: "creating",
        position: this.position,
      };
    },
    cancelMarker() {
      this.isCreating = false;
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
