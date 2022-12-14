<template>
  <svg :class="name" :height="height" :width="width" :fill="color">
    <use :xlink:href="require('@/assets/icons.svg') + hashTag"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#fff",
    },
    width: {
      type: Number,
      default: 28,
    },
    height: {
      type: Number,
      default: 28,
    },
  },
  computed: {
    hashTag() {
      return `#${this.name}`;
    },
  },
};
</script>
