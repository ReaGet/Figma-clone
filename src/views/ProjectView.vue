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
      paddingLeft: isUsersSidebarOpen,
      hasActiveMarker: activeMarker,
    }"
    @click="handleContentClick"
  >
    <div>canvas</div>
    <div class="markers">
      <MarkerComponent
        :marker="{ position: clickPosition, isCreating }"
        v-if="isCreating"
      />
      <MarkerComponent
        v-for="marker in markers"
        :key="marker.markerId"
        :marker="marker"
        @markerClick="handleMarkerClick"
      />

      <MarkerFormCreate
        :position="clickPosition"
        v-if="isCreating"
        @closeForm="closeCreateMarkerForm"
      />
      <MarkerFormComment
        v-if="activeMarker"
        :marker="activeMarker"
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
    <FilterComponent />
    <div class="markers__wrapper">
      <SidebarMarkerComponent
        v-for="marker in markers.slice().reverse()"
        :key="marker.markerId"
        :marker="marker"
        @markerClick="handleMarkerClick"
      />
    </div>
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
import SidebarMarkerComponent from "@/components/SidebarMarkerComponent";
import FilterComponent from "@/components/FilterComponent";
import MarkerComponent from "@/components/MarkerComponent.vue";
import MarkerFormCreate from "@/components/MarkerFormCreate";
import MarkerFormComment from "@/components/MarkerFormComment";
import dateFilter from "@/mixins/dateMixin";
import Faye from "@/utils/faye";

export default {
  components: {
    SidebarEl,
    SidebarMarkerComponent,
    FilterComponent,
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
    Faye.subscribe("/marker/add", (marker) => {
      this.$store.commit("addMarker", marker);
    });
    Faye.subscribe("/marker/remove", (markerId) => {
      this.$store.commit("removeMarker", markerId);
    });
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
      return this.$store.getters.markers.filter((marker) => {
        return marker.projectId === this.projectId;
      });
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
    getPosition(event) {
      return {
        x: event.pageX - 12,
        y: event.pageY - 12,
      };
    },
  },
};
</script>
