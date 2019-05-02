<template>
  <div class="component-wrapper">
    <h1>prozentsatz</h1>
    <div class="input-text-wrapper">
      <div class="field text-input">
        <label>Kapital:</label>
        <input type="text" @focus="erseMsg" @input="setKap" v-model="kapital">
        <div class="tooltip" v-if="showKap">{{msg}}</div>
      </div>
      <div class="field text-input">
        <label>Prozentteil:</label>
          <!--TODO сделать динамический заголовок, если termin = jahre, то здесь будет Neues Kapital-->
        <input type="text" @focus="erseMsg" @input="setPercent" v-model="percent">
        <div class="tooltip" v-if="showPers">{{msg}}</div>
      </div>
      <div class="common-msg" v-if="showMsg">{{msg}}</div>
    </div>
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
    <div class="field range">
      <div class="range-value" v-show="range !== 0">{{range}}</div>
      <input
        type="range"
        @input="setTime"
        :min="termin === 'tage' ? 30 : 1"
        :max="termin == 'tage' ? 360 : termin === 'jahre' ? 30 : 12"
        v-show="termin!==''"
        v-model="range"
      >
    </div>
    <button class="btn" @click="getResult">berechnen</button>
    <h2>Ergebniss(prozentsatz)</h2>
    <div class="display">{{result}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      kapital: "",
      percent: "",
      kapitalNew: "",
      msg: null,
      flag: false,
      showMsg: false,
      min: "",
      max: "",
      range: 0,
      termin: "",
      pattern: /^[\d]{1,8}\.?[\d]{0,2}$/,
      showPers: false,
      showKap: false,
      result: ""
    };
  },
  computed: {},
  methods: {
    setPercent(e) {
      this.showKap = false;
      this.percent = this.validate(this.percent).trim();
      if (this.flag) {
        this.flag = false;
        this.showPers = true;
      } else {
        this.showPers = false;
      }
    },

    setKap(e) {
      this.showPers = false;
      this.kapital = this.validate(this.kapital).trim();
      if (this.flag) {
        this.flag = false;
        this.showKap = true;
      } else {
        this.showKap = false;
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
        if (str.charAt(str.length - 4)) {
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
    getResult() {
      if (this.kapital == "" || this.percent == "") {
        this.msg = "заполните все поля!";
        this.showMsg = true;
        return;
      }
      if (this.range === 0) {
        this.result =
          (parseFloat(this.percent) * 100) / parseFloat(this.kapital);
      }

      if (this.termin === "tage") {
        this.result =
          (parseInt(this.percent) * 36000) /
          (parseInt(this.kapital) * parseInt(this.range));
        this.result = parseFloat(this.result.toFixed(2));
      }

      if (this.termin === "monate") {
        this.result =
          (parseInt(this.percent) * 1200) /
          (parseInt(this.kapital) * parseInt(this.range));
        this.result = parseFloat(this.result.toFixed(2));
      }

      if (this.termin === "jahre") {
        /**
         * TODO нужно * prozentteil * поменять на neues Kapital
         * (прцентная часть становиться больше первоночально вложенноо капитала)
         *  получается что часть становиться новым капиталом
         * в формуле его нужно делить на * kapital *
         **/

        let kap =
          (parseInt(this.percent) + parseInt(this.kapital)) / this.kapital;
        let power = (kap ** (1 / parseInt(this.range)) - 1) * 100;
        // this.percent = parseInt(this.percent);
        this.result = parseFloat(power.toFixed(2));
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

