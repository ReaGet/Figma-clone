<template>
  <div
    class="marker__form-wrapper"
    ref="markerWrapperEl"
    @keydown.esc="this.$emit('closeForm')"
    @click.stop
  >
    <div class="marker__form-top">
      <span class="marker__form-title">Ваш комментарий</span>
      <div class="marker__form-controls">
        <div class="marker__form-close" @click.stop="this.$emit('closeForm')">
          &#10006;
        </div>
      </div>
    </div>
    <form @submit.prevent="submitForm">
      <div class="marker__form-middle">
        <div class="marker__form-inputs">
          <TextareaComponent
            @handleSubmit="submitForm"
            @textareaInput="(c) => (comment = c)"
            :placeholder="'Ответить'"
          />
        </div>
      </div>
      <div class="marker__form-bottom">
        <div class="marker__form-users">
          <UserSelectComponent
            :label="'Кому'"
            :options="users"
            :default="0"
            @input="(user) => (sendTo = user)"
          />
        </div>
        <button class="marker__form-button">
          <IconComponent :name="'send'" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import TextareaComponent from "@/components/ui/TextareaComponent.vue";
import UserSelectComponent from "@/components/ui/UserSelectComponent.vue";
import IconComponent from "@/components/ui/IconComponent.vue";
// import Faye from "@/utils/faye";

export default {
  components: {
    UserSelectComponent,
    TextareaComponent,
    IconComponent,
  },
  props: ["position", "contentOffset"],
  data: () => ({
    sendTo: null,
    comment: "",
  }),
  mounted() {
    this.$refs.markerWrapperEl.style.top = `${
      this.position.y - 20 + this.contentOffset.top
    }px`;
    this.$refs.markerWrapperEl.style.left = `${
      this.position.x + 50 + this.contentOffset.left
    }px`;
  },
  computed: {
    users() {
      const $users = [{ id: -1, name: "Выберите значение" }];
      this.$store.getters.users.forEach((user) => {
        if (user.id != this.$store.getters.currentId) {
          $users.push(user);
        }
      });
      return $users;
    },
  },
  methods: {
    async submitForm() {
      console.log(this.comment);
      if (!this.comment.length) {
        return;
      }
      const marker = await this.$store.dispatch(
        "addMarkerRequest",
        this.createMarker()
      );
      if (!marker) {
        return;
      }
      await this.$store.dispatch(
        "addCommentRequest",
        this.createComment(marker, this.comment)
      );
      this.comment = "";
      this.$emit("closeForm");
    },
    createMarker() {
      const users = [this.$store.getters.currentUser.id];
      if (this.sendTo && this.sendTo.id > -1 && !users.includes(this.sendTo)) {
        users.push(this.sendTo.id);
      }
      return {
        title: "#Этаж 1, прихожая",
        created: new Date(),
        authorId: this.$store.getters.currentUser.id,
        projectId: this.$store.getters.currentProjectId,
        users: users,
        // firstComment: this.comment,
        position: this.position,
      };
    },
    createComment(marker, comment) {
      return {
        text: comment,
        created: new Date(),
        authorId: this.$store.getters.currentUser.id,
        markerId: marker.markerId,
      };
    },
  },
};
</script>
