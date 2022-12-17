<template>
  <div class="filter">
    <div class="filter__wrapper">
      <label class="filter__input-wrapper">
        <div class="filter__btn filter__btn--search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 487.95 487.95"
          >
            <path
              d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
              c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
              c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
            />
          </svg>
        </div>
        <input
          v-model="input"
          type="text"
          class="filter__input"
          placeholder="Поиск"
        />
      </label>
      <div class="filter__btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 472.615 472.615"
        >
          <polygon points="472.615,12.908 0,12.908 180.081,202.629 180.066,459.708 292.55,401.525 292.534,202.629"/> <!-- eslint-disable-line -->
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$border-radius: 6px;
.filter {
  &__wrapper {
    display: flex;
    align-items: center;
  }
  &__input {
    width: 100%;
    height: 35px;
    outline: none;
    border-radius: $border-radius;
    border: 1px solid #eee;
    padding: 0 0 0 30px;
    font-size: 0.8rem;
    &-wrapper {
      position: relative;
      flex: 1;
      margin-right: 10px;
    }
  }
  &__btn {
    width: 30px;
    height: 30px;
    padding: 5px;
    display: flex;
    //background-color: #eee;
    border-radius: $border-radius;
    cursor: pointer;
    svg {
      fill: #555;
    }
    &:hover {
      //background-color: #e5e5e5;
      svg {
        fill: #000;
      }
    }
    &--search {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>

<script>
export default {
  data: () => ({
    input: "",
  }),
};
</script>
