<template>
  <div class="component-wrapper">
    <h1>Kapital berechnen:</h1>
    <div class="field">
      <label for="kapital">Zinsen:</label>
      <input type="text">
    </div>
    <div class="field">
      <label for="prozentsatz">prozentsatz:</label>
      <input type="text">
    </div>
    <button class="btn">berechnen</button>
    <h2>Ergebniss</h2>
    <div class="display"></div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
h1,
h2 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
input[type="text"] {
  width: 40px;
  border: 1px solid black;
  outline: none;
  padding: 5px;
}
.field {
  display: flex;
  justify-content: space-between;
  width: 150px;
  margin: 20px auto;
}
.btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>

