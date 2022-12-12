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
        :key="marker.markerId"
        :marker="marker"
        @markerClick="handleMarkerClick"
        @cancelMarker="cancelMarker"
        @submitComment="submitComment"
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
  props: ["markers"],
  data: () => ({
    isCreating: false,
    position: {},
    clickedMarker: null,
  }),
  async mounted() {},
  // computed: {
  //   markers() {
  //     return this.$store.getters.markers;
  //   },
  // },
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
      const marker = await this.$store.dispatch(
        "addMarker",
        this.createMarker(data)
      );
      if (!marker) {
        return;
      }
      this.isCreating = false;
      this.$store.commit("addMarker", marker);
    },
    createMarker(data) {
      const users = [this.$store.getters.currentId];
      if (data.sendTo && data.sendTo.id > -1 && !users.includes(data.sendTo)) {
        users.push(data.sendTo.id);
      }
      return {
        // id: ~~(Math.random() * 100),
        title: "#Этаж 1, прихожая",
        created: new Date(),
        authorId: this.$store.getters.currentId,
        projectId: this.$store.getters.currentProjectId,
        users: users,
        firstComment: data.comment,
        position: this.position,
      };
    },
    cancelMarker() {
      this.isCreating = false;
      this.clickedMarker = null;
    },
    async submitComment(data) {
      const comment = await this.$store.dispatch(
        "addComment",
        this.createComment(data)
      );
      if (!comment) {
        return;
      }
      console.log(comment);
      this.$store.commit("addComment", comment);
    },
    createComment(data) {
      return {
        text: data.comment,
        created: new Date(),
        authorId: this.$store.getters.currentId,
        markerId: data.markerId,
      };
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
