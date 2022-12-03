<template>
  <button @click="toggleSidebar" style="position: absolute; z-index: 10">
    Click
  </button>
  <ContentEl />
  <SidebarEl :isOpen="isOpen" />
</template>

<script>
import SidebarEl from "@/components/app/SidebarEl";
import ContentEl from "@/components/app/ContentEl.vue";

export default {
  components: { SidebarEl, ContentEl },
  data: () => ({
    isOpen: true,
  }),
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
