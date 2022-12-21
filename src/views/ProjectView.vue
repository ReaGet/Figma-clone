<template>
  <div class="buttons">
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
    <button
      @click="$router.push('/')"
      style="position: absolute; z-index: 10; left: 10%"
    >
      Dashboard
    </button>
  </div>
  <div
    class="content"
    :class="{
      paddingRight: isMarkersSidebarOpen,
      hasActiveMarker: activeMarker,
    }"
    ref="contentEl"
    @click="handleContentClick"
  >
    <div>canvas</div>
    <div class="markers">
      <MarkerComponent
        :marker="{ position: clickPosition, isCreating }"
        :contentOffset="contentOffset"
        v-show="isCreating"
      />
      <MarkerComponent
        v-for="marker in markers"
        :key="marker.markerId"
        :marker="marker"
        :contentOffset="contentOffset"
        @markerClick="handleMarkerClick"
      />

      <MarkerFormCreate
        :position="clickPosition"
        v-if="isCreating"
        :contentOffset="contentOffset"
        @closeForm="closeCreateMarkerForm"
      />
      <MarkerFormComment
        v-if="activeMarker"
        :marker="activeMarker"
        :contentOffset="contentOffset"
        @closeForm="closeCommentMarkerForm"
      />
    </div>
  </div>
  <SidebarEl :isOpen="isUsersSidebarOpen" :left="true"></SidebarEl>
  <SidebarEl
    :isOpen="isMarkersSidebarOpen"
    :class="{ hasActiveMarker: activeMarker }"
    :right="true"
  >
    <SidebarMarkers :markers="markers" @markerClick="handleMarkerClick" />
  </SidebarEl>
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
  &.hasActiveMarker {
    .marker {
      opacity: 0.5;
      &.opened,
      &:hover {
        opacity: 1;
      }
    }
  }
}
.sidebar {
  &.hasActiveMarker {
    .sidebar-marker {
      &.opened {
        background-color: #fafdfd;
      }
    }
  }
}
.markers {
  position: absolute;
}
</style>

<script>
import SidebarEl from "@/components/app/SidebarEl";
import MarkerComponent from "@/components/marker/MarkerComponent.vue";
import MarkerFormCreate from "@/components/marker/MarkerFormCreate.vue";
import MarkerFormComment from "@/components/marker/MarkerFormComment.vue";
import dateFilter from "@/mixins/dateMixin";
import Faye from "@/utils/faye";
import SidebarMarkers from "@/components/SidebarMarkers";

export default {
  components: {
    SidebarMarkers,
    SidebarEl,
    MarkerFormCreate,
    MarkerComponent,
    MarkerFormComment,
  },
  mixins: [dateFilter],
  data: () => ({
    isUsersSidebarOpen: false,
    isMarkersSidebarOpen: true,
    activeMarker: null,
    clickPosition: {},
    isCreating: false,
    contentOffset: { top: 0, left: 0 },
  }),
  async mounted() {
    Faye.subscribe("/comment/add", (comment) => {
      this.$store.commit("addComment", comment);
      this.$store.commit("updateMarkerCommentsCount", {
        markerId: comment.markerId,
        value: this.$store.getters.getCommentsById(comment.markerId).length,
      });
      this.$store.commit("updateMarkerFirstComment", {
        markerId: comment.markerId,
        comment: comment.text,
      });
    });
    Faye.subscribe("/comment/update", (comment) => {
      this.$store.commit("updateComment", comment);
    });
    Faye.subscribe("/comment/remove", (comment) => {
      this.$store.commit("removeComment", comment);
      this.$store.commit("updateMarkerCommentsCount", {
        markerId: comment.markerId,
        value: this.$store.getters.getCommentsById(comment.markerId).length,
      });
    });
    Faye.subscribe("/marker/add", (marker) => {
      this.$store.commit("addMarker", marker);
    });
    Faye.subscribe("/marker/remove", (markerId) => {
      this.$store.commit("removeMarker", markerId);
    });
    this.contentOffset = this.getContentOffset();
    this.$store.commit("setCurrentProjectId", this.projectId);
    await this.$store.dispatch("getMarkers");
  },
  unmounted() {
    Faye.unsubscribeAll();
  },
  computed: {
    projectId() {
      return +this.$route.params.id;
    },
    markers() {
      return this.$store.getters.markers;
      // return this.$store.getters.markers.filter((marker) => {
      //   return marker.projectId === this.projectId;
      //   // const check = marker.projectId === this.projectId;
      //   // if (!this.filterText) {
      //   //   return check;
      //   // }
      //   // if (check) {
      //   //   const user = this.$store.getters.userById(marker.authorId);
      //   //   return user.name.toLowerCase().includes(this.filterText);
      //   // }
      // });
    },
  },
  methods: {
    handleMarkerClick(marker) {
      if (this.activeMarker) {
        this.closeCommentMarkerForm();
      }
      setTimeout(async () => {
        this.activeMarker = marker;
        this.isCreating = false;
        this.$store.commit("updateMarker", {
          name: "opened",
          data: {
            markerId: marker.markerId,
            value: true,
          },
        });
      }, 0);
    },
    handleContentClick(event) {
      if (this.activeMarker) {
        return;
      }
      this.isCreating = !this.isCreating;
      this.clickPosition = this.getPosition(event);
    },
    closeCreateMarkerForm() {
      this.isCreating = false;
    },
    closeCommentMarkerForm() {
      this.$store.commit("updateMarker", {
        name: "opened",
        data: {
          markerId: this.activeMarker.markerId,
          value: false,
        },
      });
      this.activeMarker = null;
    },
    getContentOffset() {
      return (
        this.$refs.contentEl?.getBoundingClientRect() || { top: 0, left: 0 }
      );
    },
    getPosition(event) {
      const rect = this.getContentOffset();
      return {
        x: event.pageX - 12 - rect.left,
        y: event.pageY - 12 - rect.top,
      };
    },
  },
};
</script>
