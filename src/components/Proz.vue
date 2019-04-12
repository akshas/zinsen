<template>
  <div class="component-wrapper">
    <h1>Zinsen berechnen:</h1>
    <div class="field">
      <label for="kapital">kapital:</label>
      <input type="text" @input="setPercent" v-model="percent">
      <!-- <div class="tooltip" v-show="flag===true">{{msg}}</div> -->
    </div>
    <div class="field">
      <label for="prozentsatz">prozentsatz:</label>
      <input type="text" :title="msg" @input="setKap" v-model="kapital">
      <!-- <div class="tooltip">{{msg}}</div> -->
    </div>
    <input type="radio" id="tage" value="tage" v-model="termin"> Tage
    <input type="radio" id="jahre" value="jahre" v-model="termin"> Jahre
    <div class="field">
      <label for="prozentsatz">prozentsatz:</label>
      <input type="range" @input="setTime" :min="rangeMin" :max="rangeMax" v-model="range">
      <div>{{range}}</div>
    </div>
    <button class="btn">berechnen</button>
    <h2>Ergebniss</h2>
    <div class="display"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kapital: "",
      percent: "",
      msg: null,
      flag: false,
      rangeMin: "",
      rangeMax: "",
      range: "",
      termin: ""
    };
  },
  computed: {
    zeit() {
      console.log(this.termin);

      if (this.termin === "tage") {
        this.tangeMin = 30;
        this.tangeMax = 30;
      }
    }
  },
  methods: {
    setPercent(e) {
      this.percent = this.validate(e, this.percent).trim();
    },

    setKap(e) {
      this.kapital = this.validate(e, this.kapital).trim();
    },
    setTime() {
      console.log(1);
    },
    /**
     *  функция валидации даных для функций setKap и setPercent
     * e -  событие input
     * str - значение ключа this.kap или this.persent (string)
     */
    validate(e, str) {
      let pattern = /^\b[\d]{1,8}\b/;
      let test = pattern.test(str);
      if (!test && str !== "") {
        str = str.slice(0, -1);
        this.msg = "только цифры!";
        if (str.length >= 8) {
          this.msg = "не больше 8";
        }
        let div = document.createElement("div");
        div.classList.add("tooltip");
        div.innerHTML = this.msg;
        if (this.flag === false) {
          // Мешает вставить тултип второму инпуту. Тултип вставляется только, еслси флаг = true.
          console.log(e.target);

          e.target.parentNode.insertBefore(div, null);
          setTimeout(() => {
            // tooltip will be removed in two seconds
            this.removeTooltip();
          }, 2000);
        }
        this.flag = true;
      } else if (this.flag) {
        this.removeTooltip();
      }
      return str;
    },
    /**
     * function for removing tooltip
     */
    removeTooltip() {
      let div = document.querySelector(".tooltip");
      div.remove();
      this.flag = false;
    }
  }
};
</script>
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
