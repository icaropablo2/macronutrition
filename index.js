import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

const app = new Vue({
  el: '#app',
  methods: {
    finishMeal: function() {
      const meal = this.current_meal
      this.current_meal = []
      this.meals.push(meal)
      this.calculateTotal()
      this.saveData()
    },
    clearMeal: function() {
      this.current_meal = []
      this.calculateTotal()
      this.saveData()
    },
    addItem: function (item) {
      this.current_meal.push(item)
      this.calculateTotal()
      this.saveData()
    },
    removeItem: function(item){
      const meal = this.current_meal.indexOf(item)
      if (meal !== -1) {
        this.current_meal.splice(meal, 1)
      }
      this.saveData()
      this.calculateTotal()
    },
    saveData: function () {
      window.localStorage.setItem('current_meal',  JSON.stringify(this.current_meal))
      window.localStorage.setItem('meals', JSON.stringify(this.meals))
    },
    loadData: function () {
      const current_meal = window.localStorage.getItem('current_meal')
      const meals = window.localStorage.getItem('meals')
      if (current_meal) {
        this.current_meal = JSON.parse(current_meal)
      }
      if (meals) {
        this.meals = JSON.parse(meals)
      }

    },
    calculateTotal: function () {
      let carb = 0
      let protein = 0
      let fat = 0
      this.current_meal.forEach(function(food) {
        carb += food.c
        protein += food.p
        fat += food.f
      })
      const calorias = carb * 4 + protein * 4 + fat * 9
      this.total = `carb: ${carb}, protein: ${protein}, fat: ${fat}, total: ${calorias}`
    },
  },
  data: {
    total: '',
    current_meal: [],
    meals: [],
    foods: [
      { name: 'banana 1uni', p: 0.84, c: 14.21, f: 0.28 },
      { name: 'ovo 1uni', p: 6.6, c: 0.9, f: 5.5 },
      { name: 'aveia 30g', p: 4.5, c: 16, f: 2.3 },
      { name: 'tapioca 60g', p: 0, c: 36, f: 0 },
      { name: 'leite 200ml', p: 6.4, c: 9.6, f: 7 },
      { name: 'pao frances', p: 4, c: 29.30, f: 1.55 },

    ],
  },
  mounted() {
    this.loadData()
    this.calculateTotal()
  },
});
