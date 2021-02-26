<template>
  <div class="mt2 ml1 mr1">
    <h1 class="title is-4 mb2">Please verify your identity</h1>
    <div class="field">
      <label class="label" for="mother-name">Mother's Name</label>
      <div class="select">
        <select v-model="motherName">
          <option value="">Select</option>
          <option v-for="name in motherNames" :key="name">{{name}}</option>
        </select>
      </div>
    </div>
    <div class="field">
      <label class="label" for="mother-name">Date of birth</label>
      <div class="flex flex-center">
        <div class="select" style="max-width: 6em;">
          <select v-model="birthday.date">
            <option value="">Date</option>
            <option v-for="date in dates" :key="date">{{date}}</option>
          </select>
        </div>
        <div class="select ml1 mr1">
          <select v-model="birthday.month">
            <option value="">Month</option>
            <option v-for="month in months" :key="month">{{month}}</option>
          </select>
        </div>
        <div class="select" style="max-width: 6em;">
          <select v-model="birthday.year">
            <option value="">Year</option>
            <option v-for="year in years" :key="year">{{year}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="control mb2">
      <button class="mt2 mb2 button is-primary is-fullwidth" v-on:click="next()">Submit</button>
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

  nextUrl = `/signup/enter-contact/?login_challenge=${this.$route.query.login_challenge}`;

  motherName = '';

  birthday = {
    date: '',
    month: '',
    year: '',
  };

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

  next() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    user.motherName = this.motherName;
    user.birthday = this.birthday;
    localStorage.setItem('user', JSON.stringify(user));
    this.$router.push({ name: 'EnterContact', query: { login_challenge: this.$route.query.login_challenge } });
  }
}

</script>

<style lang="scss" scoped>
  .select, .select select {
    width: 100%;
  }
</style>
