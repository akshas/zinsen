<template>
  <div class="component-wrapper">
    <h1>Kapital</h1>
    <div class="input-text-wrapper">
      <div class="field text-input">
        <label class="input-title" for="satz">Prozentteil:</label>
        <input type="text" @focus="erseMsg" @input="setPercent" v-model="percent">
        <div class="tooltip" v-if="showPers">{{msg}}</div>
      </div>
      <div class="field text-input">
        <label class="input-title" for="prozentsatz">Prozentsatz:</label>
        <input type="text" @focus="erseMsg" @input="setSatz" v-model="satz">
        <div class="tooltip" v-if="showSatz">{{msg}}</div>
      </div>
      <div class="common-msg" v-if="showMsg">{{msg}}</div>
    </div>
    <!-- попробовать v-for -->
    <!-- Radios -->
    <div class="field radios">
      <div class="radio">
        <label class="container">
          Tage
          <input type="radio" id="tage" value="tage" v-model="termin">
          <span class="checkmark"></span>
        </label>
      </div>

      <div class="radio">
        <label class="container">
          Monate
          <input type="radio" id="monate" value="monate" v-model="termin">
          <span class="checkmark"></span>
        </label>
      </div>
      <div class="radio">
        <label class="container">
          Jahre
          <input type="radio" id="jahre" value="jahre" v-model="termin">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <!-- /.radios -->
    <!-- попробовать v-for -->
    <div class="field range" v-show="termin!==''">
      <div class="range-value" v-if="range !== 0">{{range}}</div>
      <div class="range-value" v-else>{{getVal.min}}</div>
      <input type="range" @input="setTime" :min="getVal.min" :max="getVal.max" v-model="range">
    </div>
    <button class="btn" @click="getResult">berechnen</button>
    <h2>Ergebniss(Kapital)</h2>
    <div class="expl">{{explanation}}</div>
    <div class="display">
      <div class="result">{{result}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      satz: "",
      percent: "",
      msg: null,
      flag: false,
      min: "",
      max: "",
      range: 0,
      termin: "",
      pattern: /^[\d]{1,6}\.?[\d]{0,2}$/,
      showPers: false,
      showSatz: false,
      showKap: false,
      showMsg: false,
      explanation: "",
      result: ""
    };
  },
  computed: {
    getVal() {
      this.range = 0;
      if (this.termin === "jahre") {
        this.min = 1;
        this.max = 30;
      }
      if (this.termin === "monate") {
        this.min = 1;
        this.max = 12;
      }
      if (this.termin === "tage") {
        this.min = 30;
        this.max = 360;
      }
      return {
        min: this.min,
        max: this.max
      };
    }
  },
  methods: {
    setPercent(e) {
      this.showSatz = false;
      this.percent = this.validate(this.percent).trim();
      if (this.flag) {
        this.flag = false;
        this.showPers = true;
      } else {
        this.showPers = false;
      }
    },

    setSatz(e) {
      this.showPers = false;
      this.satz = this.validate(this.satz).trim();
      console.log(1);

      if (this.flag) {
        this.flag = false;
        this.showSatz = true;
      } else {
        this.showSatz = false;
      }
    },
    erseMsg() {
      this.showMsg = false;
      this.showSatz = false;
      this.showKap = false;
    },
    setTime() {
      console.log(1);
    },
    /**
     *  функция валидации даных для функций setKap и setpercent
     * e -  событие input
     * str - значение ключа this.kap или this.persent (string)
     */
    validate(str) {
      let test = this.pattern.test(str);

      if (!test && str !== "") {
        str = str.slice(0, -1);
        this.msg = "только цифры!";
        if (str.charAt(str.length - 4) === ".") {
          // Если после точки ставить больше 2 знаков - несоответствие шаблону и соответств. message
          this.msg = "2 знака после точки!";
        }
        if (str.length >= 8) {
          this.msg = "не больше 8";
        }

        this.flag = true;
      }

      return str;
    }, // validate

    /**
     *  переделать getResult для поиска капитала
     */
    getResult() {
      if (this.kapital == "" || this.percent == "") {
        this.msg = "заполните все поля!";
        this.showMsg = true;
        return;
      }
      if (this.range === 0) {
        this.result = (parseFloat(this.percent) * 100) / parseFloat(this.satz);
      }
      if (this.termin === "tage") {
        this.result =
          (parseInt(this.percent) * 36000) /
          (parseInt(this.satz) * parseInt(this.range));
        this.result = parseFloat(this.result.toFixed(2));
      }
      if (this.termin === "monate") {
        this.result =
          (parseInt(this.percent) * 1200) /
          (parseInt(this.satz) * parseInt(this.range));
        this.result = parseFloat(this.result.toFixed(2));
      }
      if (this.termin === "jahre") {
        this.explanation =
          "такое количество денег нужно вложить, чтобы получить введенную сумму";
        let nenner = (1 + this.satz / 100) ** this.range;
        this.result = (this.percent / nenner).toFixed(2);
      }
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
// input[type="text"] {
//   width: 40px;
//   border: 1px solid black;
//   outline: none;
//   padding: 5px;
// }
// .field {
//   display: flex;
//   justify-content: space-between;
//   width: 150px;
//   margin: 20px auto;
// }
.btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>

