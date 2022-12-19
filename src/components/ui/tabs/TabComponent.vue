<template>
  <div class="tab__title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabComponent",
  props: {
    title: {
      type: String,
      default: "",
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    href() {
      return "#" + this.name.toLowerCase().replace(/ /g, "-");
    },
  },
  mounted() {
    this.isActive = this.selected;
  },
};
</script>
