<template>
  <div ref="sidebar" class="sidebar" :class="{ open: isOpen }">
    <FilterComponent />
    <div class="markers__wrapper">
      <SidebarMarkerComponent
        v-for="marker in markers"
        :key="marker.date"
        :data="marker"
      />
    </div>
  </div>
</template>

<style lang="scss">
.sidebar {
  max-width: 300px;
  width: 100%;
  height: 100vh;
  background-color: #f0f0f0;
  position: fixed;
  right: -100%;
  top: 0;
  padding: 10px;
  transition: right 0.2s ease-in-out;

  &.open {
    right: 0;
  }
}
.markers__wrapper {
  padding: 10px 0;
}
</style>

<script>
import FilterComponent from "@/components/FilterComponent";
import SidebarMarkerComponent from "@/components/SidebarMarkerComponent";
export default {
  data: () => ({
    markers: [
      {
        user: {
          name: "Rishat",
          isItMe: true,
        },
        date: "02.12.2022",
        title: "#Этаж 1, прихожая",
        comments: [
          {
            date: "02.12.2022",
            text: "Test text",
          },
        ],
      },
      {
        user: {
          name: "Rifat",
        },
        date: "01.12.2022",
        title: "#Этаж 2, ванная",
        comments: [
          {
            date: "02.12.2022",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
          },
          {
            date: "02.12.2022",
            text: "Seconds comment.",
          },
        ],
      },
    ],
  }),
  components: { SidebarMarkerComponent, FilterComponent },
  props: ["isOpen"],
  mounted() {},
  methods: {
    open() {
      this.$refs.sidebar.classList.add("open");
    },
    close() {
      this.$refs.sidebar.classList.remove("open");
    },
    toggle() {
      this.$refs.sidebar.classList.toggle("open");
    },
  },
};
</script>
