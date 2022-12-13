<template>
  <div
    class="content"
    :class="{
      paddingRight: isMarkersSidebarOpen,
      paddingLeft: isUsersSidebarOpen,
    }"
    @click="handleContentClick"
  >
    <div>canvas</div>
    <div class="markers">
      <MarkerComponent :marker="{ position, isCreating }" v-if="isCreating" />
      <MarkerComponent
        v-for="marker in markers"
        :key="marker.markerId"
        :marker="marker"
        @markerClick="handleMarkerClick"
      />

      <MarkerFormCreate
        :position="position"
        v-if="isCreating"
        @closeForm="closeCreateMarkerForm"
      />
      <MarkerFormComment
        v-if="clickedMarker"
        :marker="clickedMarker.item"
        @closeForm="closeCommentMarkerForm"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/marker-form.scss";
.content {
  position: relative;
  background-color: #aaa;
  height: 100vh;
  &.paddingRight {
    padding-right: 300px;
  }
  &.paddingLeft {
    padding-left: 300px;
  }
}
.markers {
  position: absolute;
}
</style>

<script>
import MarkerComponent from "@/components/MarkerComponent.vue";
import MarkerFormCreate from "@/components/MarkerFormCreate";
import MarkerFormComment from "@/components/MarkerFormComment";
import dateFilter from "@/mixins/dateMixin";

export default {
  components: { MarkerFormCreate, MarkerComponent, MarkerFormComment },
  mixins: [dateFilter],
  props: ["markers", "isUsersSidebarOpen", "isMarkersSidebarOpen"],
  data: () => ({
    isCreating: false,
    clickedMarker: null,
    position: {},
  }),
  async mounted() {},
  methods: {
    handleMarkerClick(marker) {
      if (this.clickedMarker) {
        this.clickedMarker.close();
        this.clickedMarker = null;
      }
      setTimeout(() => {
        this.clickedMarker = marker;
        this.isCreating = false;
      }, 0);
    },
    handleContentClick(event) {
      if (this.clickedMarker) {
        return;
      }
      this.isCreating = !this.isCreating;
      this.position = this.getPosition(event);
    },
    closeCreateMarkerForm() {
      this.isCreating = false;
    },
    closeCommentMarkerForm() {
      this.clickedMarker.close();
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
