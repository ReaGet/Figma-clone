<template>
  <form
    @submit.prevent="submitForm"
    class="marker__form"
    ref="markerFormEl"
    @keydown.esc="this.$emit('closeForm')"
    @click.stop
  >
    <div class="marker__form-wrapper">
      <div class="marker__form-top">
        <span class="marker__form-title">Ваш комментарий</span>
        <div class="marker__form-controls">
          <div class="marker__form-close" @click.stop="this.$emit('closeForm')">
            &#10006;
          </div>
        </div>
      </div>
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
    </div>
  </form>
</template>

<script>
import TextareaComponent from "@/components/ui/TextareaComponent.vue";
import UserSelectComponent from "@/components/ui/UserSelectComponent";
import IconComponent from "@/components/ui/IconComponent";
// import Faye from "@/utils/faye";

export default {
  components: {
    UserSelectComponent,
    TextareaComponent,
    IconComponent,
  },
  props: ["position"],
  data: () => ({
    comment: "",
    sendTo: null,
  }),
  mounted() {
    this.$refs.markerFormEl.style.top = `${this.position.y - 20}px`;
    this.$refs.markerFormEl.style.left = `${this.position.x + 50}px`;
    console.log(this.position);
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
        firstComment: this.comment,
        position: this.position,
      };
    },
  },
};
</script>
