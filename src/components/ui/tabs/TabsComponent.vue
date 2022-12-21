<template>
  <div class="tabs">
    <ul>
      <li v-for="tab in tabs" :key="tab.title" class="tab__title">
        {{ tab.title }}
      </li>
    </ul>
    <div class="tabs__details">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import { h } from "vue";

export default {
  data: () => ({
    tabs: [],
    selectedIndex: 0,
  }),
  computed: {
    tabsToDisplay() {
      console.log(this.tabs);
      return this.tabs.map((item, idx) => {
        return h(
          "div",
          {
            class: "tab",
            style: `display: ${
              this.selectedIndex.value == idx ? "block" : "none"
            }`,
          },
          item
        );
      });
    },
  },
  mounted() {
    console.log(this.$slots.default());
    this.tabs = this.$slots.default().filter((tab) => {
      return tab.type.name === "TabComponent";
      // this.tabs.push({
      //   title: tab.props.title,
      //   selected: tab.props.selected,
      // });
    });
    console.log(this.tabs);
  },
};
</script>
