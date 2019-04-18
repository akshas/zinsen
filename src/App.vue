<!--<img src="./assets/logo.png">-->
<template>
  <div id="app">
    <div class="wrapper">
      <div class="menu">
        <img src="./assets/Home.png" alt="percent calculate" width="30" @click="start">
      </div>
      <start-page
        v-if="state === 'start'"
        @zinsen="state = 'percent'"
        @satz="state = 'percentage'"
        @kapital="state = 'sum'"
      ></start-page>
      <find-percent v-if="state === 'percent'"></find-percent>
      <find-percentage v-if="state === 'percentage'"></find-percentage>
      <find-capital v-if="state === 'sum'"></find-capital>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      state: "start"
    };
  },
  methods: {
    start() {
      this.state = "start";
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #eee;
}
.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 500px;
  min-height: 500px;
  background-color: #fff;
  padding: 20px;
}
.component-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
}
.menu {
  // margin: 0 auto;
  // width: 500px;
  img {
    cursor: pointer;
  }
}
</style>
