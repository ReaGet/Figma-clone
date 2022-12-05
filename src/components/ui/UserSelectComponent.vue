<template>
  <label class="select" @blur="active = false" :tabindex="tabindex">
    <span class="select__label" v-if="label">{{ label }}</span>
    <div class="select__wrapper" :class="{ active: active }">
      <div class="select__current" @click="active = true">
        <UserInfo :user="getSelected" />
      </div>
      <ul class="select__list">
        <li
          v-for="option in options"
          :key="option.id"
          class="select__item"
          @click.stop="
            selected = option;
            active = false;
            $emit('input', option);
          "
        >
          <UserInfo :user="option" />
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
    padding: 3px 3px 3px 5px;
    font-size: 12px;
    display: flex;
    align-items: center;
    border-radius: 6px;
    background-color: rgb(213 213 213);
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
    display: flex;
    justify-content: flex-start;
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
import UserInfo from "@/components/UserInfo";
export default {
  components: { UserInfo },
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: Number,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
  },
  data: () => ({
    active: false,
    selected: null,
  }),
  computed: {
    getSelected() {
      return this.selected
        ? this.selected
        : this.options[this.default]
        ? this.options[this.default]
        : this.options[0];
    },
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>
