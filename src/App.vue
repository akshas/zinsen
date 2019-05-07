<!--<img src="./assets/logo.png">-->

<template>
  <div id="app">
    <div class="wrapper">
      <div class="menu">
        <router-link to="/">
          <img src="./assets/Home.png" alt="percent calculate" width="30" @click="start">
        </router-link>
        <img src="./assets/information.png" alt="information" width="30" @click="info">
        <!-- TODO запилить компонент инфо-->
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// TODO убрать все логи
export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    start() {
      this.state = "start";
    },
    info() {
      console.log(1);
    }
  }
};
</script>

<style lang="scss">
/** Main Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background-color: #eee;
  font-family: "Open Sans";
}
h1 {
  color: rgba(#ab0202, 0.75);
}
/** WRAPPERS*/
.wrapper {
  position: absolute;
  // TODO разобраться с размером врапера
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 650px;
  height: 95vh;
  background-color: #fff;
  padding: 20px;
}
.component-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.field {
  display: flex;
  justify-content: center;
  width: 350px;
  margin: 10px auto;
  position: relative;
  .tooltip {
    position: absolute;
    right: -120px;
    color: red;
    // top: 0px;
  }
}
/** MENU */
.menu {
  // margin: 0 auto;
  // width: 500px;
  z-index: 888;
  position: relative;
  img {
    cursor: pointer;
  }
}
/** INPUT TYPE=TEXT */
.input-text-wrapper {
  display: flex;
  // flex-wrap: wrap;
  justify-content: center;
  position: relative;
  .common-msg {
    position: absolute;
    right: 20%;
    top: 100%;
    transform: translateY(-50%);
    color: red;
  }
}
.text-input {
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  label {
    width: 145px;
  }
}
.input-title {
  font-weight: bold;
  font-size: 12px;
}
input {
text-align: center;
  border: 3px solid darkred;
  outline: none;
  padding: 5px;
}
input[type="text"] {
  width: 145px;
  height: 65px;
  font-size: 18px;
  padding: 10px;
  border-radius: 2px;
}

/** INPUT TYPE=RADIO */
.radios {
  display: flex;
  justify-content: flex-end;
  .radio {
    position: relative;
    margin-left: 30px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    width: 40px;
    height: 60px;
    font-size: 11px;
    font-weight: bold;

    label {
      position: relative;
      width: 100%;
    }
    .checkmark {
      margin: 0 auto;
      margin-top: 3px;
      width: 15px;
      height: 15px;
      background-color: #eee;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        width: 5px;
        height: 5px;
        background-color: darkred;
        border-radius: 50%;
      }
    }
    input {
      width: 0;
      height: 0;
      opacity: 0;
      position: absolute;
      cursor: pointer;
      &:checked ~ .checkmark {
        background-color: #faeec5;
        &:after {
          display: block;
        }
      }
    }
  }
}
/** INPUT TYPE=checkbox */
.checkbox {
  display: block;
  position: relative;
  padding-right: 40px;
  text-align: right;
  user-select: none;
  cursor: pointer;
  input {
    width: 0;
    height: 0;
    opacity: 0;
    position: absolute;
    cursor: pointer;
    &:checked ~ .checkmark {
      background-color: #faeec5;
      &:after {
        display: block;
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 0;
    right: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    cursor: pointer;
    &:hover {
      background-color: #ccc;
    }
  }
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .checkbox input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid darkred;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

/** range */
.range {
  margin-top: 70px;
  position: relative;
  input {
    width: 100%;
    padding: 0;
    height: 5px;
    border-radius: 5px;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: white;
    box-shadow: inset 0 3px 18px rgba(darkred, 0.7);
    outline: none;
    margin: 20px;
    &::-webkit-slider-thumb {
      cursor: pointer;
      -webkit-appearance: none;
      // -moz-appearance: none;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: darkred;
      position: relative;

      &:active {
        box-shadow: 0 0 0 3px white, 0 0 0 6px darkred;
      }
    }
  }
  .range-value {
    left: 50%;
    padding-bottom: 20px;
    transform: translateX(-50%);
    position: absolute;
    top: -50px;
    // right: -80px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background-color: #cee;
    text-align: center;
    font-size: 18px;
    font-weight: 800;
    text-align: center;
  }
}

/** button */
.btn {
  width: 200px;
  height: 40px;
  outline: none;
  background-color: #faeec5;
  border: 2px solid darken(#faeec5, 30%);
  border-radius: 5px;
  cursor: pointer;
  color: darken(#faeec5, 30%);
  font-weight: bold;
  text-transform: uppercase;
  &:hover {
    border-color: darken(#faeec5, 10%);
    background-color: darken(#faeec5, 20%);
    color: darken(#faeec5, 50%);
  }
}
/**
 *  display
 */
.display {
  min-height: 40px;
  max-width: 400px;
  text-align: center;
  background-color: #eec;
  padding: 30px;
  margin: 20px auto;
  border-radius: 5px;
}
</style>
