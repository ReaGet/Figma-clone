<template>
  <button @click="toggleSidebar">Click</button>
  <CanvasEl />
  <SidebarEl :isOpen="isOpen" />
</template>

<script>
import SidebarEl from "@/components/app/SidebarEl";
import CanvasEl from "@/components/app/CanvasEl";

export default {
  components: { SidebarEl, CanvasEl },
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
