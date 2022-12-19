<template>
  <div class="users">
    <div class="users__top">
      <span class="users__top-title">Поделиться проектом</span>
      <div class="users__top-controls">
        <div class="users__top-close" @click.stop="this.$emit('closeForm')">
          &#10006;
        </div>
      </div>
    </div>
    <div class="user__middle">
      <TabsComponent>
        <TabComponent :title="'tab #1'">Hello</TabComponent>
        <TabComponent :title="'tab #2'">How are you?</TabComponent>
      </TabsComponent>
    </div>
  </div>
</template>

<style lang="scss">
.users {
  display: flex;
  flex-direction: column;
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    &-title {
      font-weight: 600;
      font-size: 14px;
    }
    &-controls {
      display: flex;
    }
    &-close {
      cursor: pointer;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
}
</style>

<script>
import TabsComponent from "@/components/ui/tabs/TabsComponent";
import TabComponent from "@/components/ui/tabs/TabComponent";
export default {
  components: { TabComponent, TabsComponent },
  data: () => ({
    activeTab: 0,
  }),
};
</script>
