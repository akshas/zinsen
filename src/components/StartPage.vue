<template>
  <div class="component-wrapper">
    <div class="buttons">
      <button class="btn" @click="$emit('zinsen')">Zinsen berechnen</button>
      <button class="btn" @click="$emit('satz')">Prozentsatz berechnen</button>
      <button class="btn" @click="$emit('kapital')">gefordertes Kapital berechnen</button>
    </div>
  </div>
</template>
<script>
</script>
<style scoped lang="scss">
.buttons {
  height: 100px;
  min-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #aaa;
  color: tomato;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .btn {
    height: 30px;
  }
}
</style>
