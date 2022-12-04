<template>
  <textarea
    cols="30"
    rows="1"
    @input="handleInput"
    ref="textarea"
    v-model.trim="comment"
    class="textarea"
    @keydown.enter="handleEnter"
  ></textarea>
</template>

<style lang="scss">
.textarea {
  padding: 10px;
  overflow: hidden;
  border-radius: 6px;
  outline: none;
  border: 1px solid #e0e0e0;
  color: #555555;
  font-size: 14px;
  resize: none;
}
</style>

<script>
export default {
  data: () => ({
    comment: "",
  }),
  mounted() {
    if (this.$refs.textarea) {
      this.$refs.textarea.focus();
      this.handleTextAreaSize();
    }
  },
  methods: {
    handleInput() {
      this.handleTextAreaSize();
      this.$emit("textareaInput", this.comment);
    },
    handleTextAreaSize() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + "px";
    },
    handleEnter(event) {
      if (!event.ctrlKey && !event.shiftKey) {
        event.preventDefault();
        this.$emit("handleSubmit");
        return;
      }
      if (event.ctrlKey) {
        this.$refs.textarea.value += "\n";
      }
      this.handleTextAreaSize();
    },
  },
};
</script>
