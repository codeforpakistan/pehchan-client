<template>
  <div class="mt2 ml1 mr1">
    <h1 class="title is-4 mb2">Please verify your identity</h1>
    <div class="field">
      <label class="label" for="mother-name">Mother's Name</label>
      <div class="select">
        <select>
          <option value="">Select</option>
          <option v-for="name in motherNames" :key="name">{{name}}</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label" for="mother-name">Date of birth</label>
      <div class="flex flex-center">
        <div class="select" style="max-width: 6em;">
          <select>
            <option value="">Date</option>
            <option v-for="date in dates" :key="date">{{date}}</option>
          </select>
        </div>
        <div class="select ml1 mr1">
          <select>
            <option value="">Month</option>
            <option v-for="month in months" :key="month">{{month}}</option>
          </select>
        </div>
        <div class="select" style="max-width: 6em;">
          <select>
            <option value="">Year</option>
            <option v-for="year in years" :key="year">{{year}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="control mb2">
      <router-link class="mt2 mb2 button is-primary is-fullwidth" to="/signup/enter-contact">
        Submit
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  motherNames = ['Amna Sultan', 'Fatima Chughtai', 'Faheema Manthar'];

  dates: any = [];

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];

  years: any = [];

  mounted() {
    for (let i = 1; i < 32; i += 1) {
      this.dates.push(i);
    }

    const thisYear = Number((new Date()).getFullYear());

    this.years.push(thisYear);

    for (let i = 1; i < 130; i += 1) {
      this.years.push(thisYear - i);
    }
  }
}

</script>

<style lang="scss" scoped>
  .select, .select select {
    width: 100%;
  }
</style>
