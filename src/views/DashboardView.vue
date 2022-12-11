<template>
  <div class="container">
    <div class="project-list">
      <div
        class="project"
        v-for="project in projects"
        :key="project.id"
        @click="handleClick(project.id)"
      >
        {{ project.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project {
  min-width: 200px;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #e5e5e5;
  padding: 15px;
  &-list {
    display: flex;
    gap: 15px;
  }
}
</style>

<script>
export default {
  name: "DashboardView",
  computed: {
    projects() {
      return this.$store.getters.projects;
    },
  },
  methods: {
    handleClick(id) {
      this.$router.push(`/project/${id}`);
      console.log(`Open project ${id}`);
    },
  },
};
</script>
