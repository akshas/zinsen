<template>
  <div class="component-wrapper">
    <h1>Zinsen berechnen:</h1>

    <div class="input-text-wrapper">
      <div class="field text-input">
        <label class="input-title" for="kapital">kapital:</label>
        <input type="text" @input="setKap" @focus="erseMsg" v-model="kapital">
        <div class="tooltip" v-if="showKap">{{msg}}</div>
      </div>

      <!-- this.persent -->
      <div class="field text-input">
        <label class="input-title" for="prozentsatz">prozentsatz:</label>
        <input type="text" @input="setPercent" @focus="erseMsg" v-model="percent">
        <div class="tooltip" v-if="showPers">{{msg}}</div>
      </div>
      <div class="common-msg" v-if="showMsg">{{msg}}</div>
    </div>
    <!-- radios -->
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
    <label class="field checkbox" v-show="termin === 'jahre'">
      percent only
      <input type="checkbox" checked="checked" @click="sum = !sum">
      <span class="checkmark"></span>
    </label>
    <!-- <label for="prozentsatz">prozentsatz:</label> -->
    <div class="field range" v-show="termin!==''">
      <div class="range-value" v-if="range !== 0">{{range}}</div>
      <div class="range-value" v-else>{{getVal.min}}</div>
      <input type="range" @input="setTime" :min="getVal.min" :max="getVal.max" v-model="range">
    </div>
    <button class="btn" @click="getResult">berechnen</button>

    <h2>Ergebniss(teil)</h2>
    <div class="display">
      <div class="result">{{result}}</div>
    </div>
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
      min: "",
      max: "",
      range: 0,
      termin: "",
      pattern: /^[\d]{1,6}\.?[\d]{0,2}$/,
      showPers: false,
      showKap: false,
      showMsg: false,
      sum: false,
      moving: false,
      result: ""
    };
  },
  computed: {
    getVal() {
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
      this.range = this.min;
      return {
        min: this.min,
        max: this.max
      };
    }
  },
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
      this.showPers = false;
      this.showKap = false;
    },
    /**
     *  функция валидации даных для функций setKap и setPercent
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
          this.msg = "не больше 2 знаков после точки";
        }
        if (str.length >= 8) {
          this.msg = "не больше 8";
        }

        this.flag = true;
      }

      return str;
    }, // validate
    setTime(e) {},

    getResult() {
      if (this.kapital == "" || this.percent == "") {
        this.msg = "заполните все поля!";
        this.showMsg = true;
        return;
      }
      if (this.range === 0) {
        this.result =
          (parseFloat(this.kapital) * parseFloat(this.percent)) / 100;
      }
      if (this.termin === "tage") {
        this.result =
          (parseInt(this.kapital) *
            parseInt(this.percent) *
            parseInt(this.range)) /
          (100 * 360);
        this.result = parseFloat(this.result.toFixed(2));
      }
      if (this.termin === "monate") {
        this.result =
          (parseFloat(this.kapital) *
            parseFloat(this.percent) *
            parseInt(this.range)) /
          (100 * 12);
        this.result = parseFloat(this.result.toFixed(2));
      }
      if (this.termin === "jahre") {
        let kapital = 1 + parseFloat(this.percent) / 100;
        kapital = Math.pow(kapital, this.range);
        this.kapitalNew = kapital * this.kapital;
        if (this.sum) {
          this.result = parseFloat(this.kapitalNew).toFixed(2);
        } else {
          this.result = parseFloat(this.kapitalNew - this.kapital).toFixed(2);
        }
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
input[type="text"] {
  // width: 40px;
  // border: 1px solid black;
  // outline: none;
  // padding: 5px;
}
.field {
  // display: flex;
  // justify-content: space-between;
  // width: 150px;
  // margin: 20px auto;
  // position: relative;
}
.btn {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.range-value {
  // position: absolute;
  // top: -50px;
  // right: -80px;
  // width: 40px;
  // height: 40px;
  // line-height: 40px;
  // border-radius: 50%;
  // background-color: #cee;
  // text-align: center;
  // font-size: 18px;
  // font-weight: 800;
  // text-align: center;
}
</style>
