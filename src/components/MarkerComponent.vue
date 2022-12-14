<template>
  <div
    class="marker"
    :class="{ creating: isCreating, opened: marker.opened }"
    :style="position"
    draggable="true"
    @click.stop="handleClick"
    @dragstart.stop="startDrag($event)"
  >
    <div class="marker__inner">
      <UserLogo :user="user" v-if="!isCreating" />
      <div class="marker__content" v-if="!isCreating">
        <div class="marker__info">
          <div class="marker__author">{{ this.user.name }}</div>
          <div class="marker__date">{{ date }}</div>
        </div>
        <div class="marker__comment">{{ marker.firstComment }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$transition-speed: 0.1s;
.marker {
  user-select: none;
  position: absolute;
  &__inner {
    position: absolute;
    bottom: 0;
    border: 4px solid #fff;
    cursor: pointer;
    border-radius: 16px 16px 16px 0px;
    min-width: 32px;
    min-height: 32px;
    background-color: #fff;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
    display: flex;
    transition: min-width $transition-speed ease-in-out,
      padding $transition-speed ease-in-out;
  }
  &__content {
    visibility: hidden;
    overflow: hidden;
    max-width: 0;
    font-size: 11px;
    transition: max-width $transition-speed ease-in-out,
      max-height $transition-speed ease-in-out,
      margin-left $transition-speed ease-in-out;
  }
  &:not(.creating):not(.opened):hover {
    z-index: 30;
    .marker__inner {
      min-width: 240px;
      padding: 5px;
      .marker__content {
        margin-left: 10px;
        visibility: visible;
        max-width: 240px;
      }
      .marker__comment {
        max-height: 150px;
      }
    }
  }
  &__info {
    display: flex;
  }
  &__author {
    font-weight: 600;
    margin-right: 10px;
    color: #555;
  }
  &__date {
    color: #aaa;
  }
  &__comment {
    text-align: left;
    margin-top: 5px;
    max-height: 0px;
    min-width: 180px;
    overflow: hidden;
    transition: max-height $transition-speed ease-in-out;
  }
}
</style>

<script>
import UserLogo from "@/components/UserLogo.vue";
import dateMixin from "@/mixins/dateMixin";

export default {
  components: {
    UserLogo,
  },
  data: () => ({
    dragging: false,
    opened: false,
  }),
  props: ["marker"],
  mixins: [dateMixin],
  computed: {
    user() {
      return this.$store.getters.users.find(
        (user) => this.marker.authorId == user.id
      );
    },
    position() {
      const { x, y } = this.marker.position;
      return `top: ${y}px; left: ${x}px;`;
    },
    isCreating() {
      return this.marker.isCreating || false;
    },
    date() {
      return this.dateFilter(this.marker.created);
    },
  },
  methods: {
    async handleClick() {
      if (this.marker.opened || this.isCreating) {
        return;
      }
      if (!this.isCreating) {
        await this.$store.dispatch("loadComments", this.marker.markerId);
      }
      this.$emit("markerClick", this.marker);
    },
    startDrag(evt) {
      this.dragging = true;
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
    },
  },
};
</script>
