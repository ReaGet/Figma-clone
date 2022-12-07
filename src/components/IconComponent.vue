<template>
  <svg height="28" width="28">
    <use :xlink:href="require('@/assets/icons.svg') + hashTag"></use>
  </svg>
</template>

<script>
export default {
  props: ["name"],
  computed: {
    hashTag() {
      return `#${this.name}`;
    },
  },
};
</script>
