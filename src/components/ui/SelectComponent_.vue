<template>
  <label class="select">
    <span class="select__label" v-if="label">{{ label }}</span>
    <select class="select__tag" ref="select" hidden>
      <option v-for="user in users" :key="user.id" :value="user.id">
        {{ user.name }}
      </option>
    </select>
    <div class="select__wrapper" ref="selectWrapper" @click="openSelect">
      <div class="select__current">
        <UserInfo :user="currentUser" v-if="currentUser" />
        <span v-else>Выберите пользователя</span>
      </div>
      <ul class="select__list">
        <li
          v-for="(user, index) in users"
          :key="user.id"
          value="{ user.id }"
          class="select__item"
          @click.stop="selectItem(index)"
        >
          <UserInfo :user="user" />
        </li>
      </ul>
    </div>
  </label>
</template>

<style lang="scss">
.select {
  width: 100%;
  display: flex;
  align-items: center;
  &__label {
    margin-right: 5px;
  }
  &__wrapper {
    position: relative;
    min-height: 30px;
    display: flex;
    align-items: center;
    border: 1px solid #2c3e50;
    width: 100%;
    border-radius: 6px;
  }
  &__current {
    cursor: pointer;
    height: 100%;
    width: 100%;
    padding: 3px 3px 3px 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
  }
  &__list {
    list-style: none;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #555;
    overflow: hidden;
  }
  &__item {
    padding: 5px;
    &:hover {
      background-color: #efefef;
      cursor: pointer;
    }
  }
  &__wrapper.active {
    border-color: transparent;
    .select__list {
      display: flex;
    }
  }
}
</style>

<script>
import UserInfo from "@/components/user/UserInfo.vue";

export default {
  components: { UserInfo },
  props: ["label", "options"],
  data: () => ({
    curentIndex: Infinity,
  }),
  methods: {
    openSelect() {
      this.$refs.selectWrapper.classList.add("active");
    },
    closeSelect() {
      this.$refs.selectWrapper.classList.remove("active");
    },
    selectItem(index) {
      this.curentIndex = index;
      this.$refs.select.value = this.currentUser.id;
      this.closeSelect();
      this.$emit("changeSelect", this.currentUser);
    },
  },
  computed: {
    currentUser() {
      return this.users?.at(this.curentIndex);
    },
    users() {
      return this.options.filter(
        (user) => user.id !== this.$store.getters.currentId
      );
    },
  },
};
</script>
