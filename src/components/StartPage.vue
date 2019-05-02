<template>
  <div class="component-wrapper">
    <div class="boxes">
      <router-link to="/zinsen" class="link">
        <div class="box" @click="$emit('zinsen')">
          <img src="../assets/percent.png" alt="home">
          <div class="title">Zinsen</div>
        </div>
      </router-link>
      <router-link to="/capital">
        <div class="box" @click="$emit('kapital')">
          <img src="../assets/capital.png" alt="home">
          <div class="title">Capital</div>
        </div>
      </router-link>
      <router-link to="/percentage">
        <div class="box" @click="$emit('satz')">
          <img src="../assets/percentage.png" alt="home">
          <div class="title">Percentage</div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
.boxes {
  display: flex;
  justify-content: space-around;
  min-width: 650px;
  // flex-wrap: wrap;
  .box {
    width: 180px;
    height: 180px;
    background-color: #ddd;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    cursor: pointer;
    img {
      width: 80px;
    }
    .title {
      position: absolute;
      width: 100%;
      text-align: center;
      background-color: rgba(darkred, 0.7);
      color: #fff;
      height: 25px;
      line-height: 25px;
      align-self: flex-end;
    }
  }
}
</style>

