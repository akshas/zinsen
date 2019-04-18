<template>
  <div class="component-wrapper">
    <h1>Kapital</h1>
    <div class="field">
      <label for="satz">Prozentteil:</label>
      <input type="text" @input="setPercent" v-model="percent">
      <div class="tooltip" v-if="showPers">{{msg}}</div>
    </div>
    <div class="field">
      <label for="prozentsatz">Prozentsatz:</label>
      <input type="text" @input="setSatz" v-model="satz"> %
      <div class="tooltip" v-if="showSatz">{{msg}}</div>
    </div>

    <!-- попробовать v-for -->
    <input type="radio" id="tage" value="tage" v-model="termin">
    Tage
    <input type="radio" id="monate" value="monate" v-model="termin"> Monate
    <input type="radio" id="jahre" value="jahre" v-model="termin">
    Jahre
    <!-- попробовать v-for -->

    <div class="field">
      <div class="range-value" v-show="range !== 0">{{range}}</div>
      <label for="prozentsatz">Zeit:</label>
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
    <h2>Ergebniss(Kapital)</h2>
    <div class="expl">{{explanation}}</div>
    <div class="display">{{result}}</div>
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
      min: 1,
      max: 12,
      range: 1,
      termin: "",
      pattern: /^[\d]{1,8}\.?[\d]{0,2}$/,
      showPers: false,
      showSatz: false,
      showKap: false,
      explanation: "",
      result: ""
    };
  },
  computed: {},
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
          this.msg = "не больше 2 знаков после точки";
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

