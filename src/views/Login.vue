<template>
<div class="login mt2 ml1 mr1">
  <h1 class="mt3 mb2">Log into Pehchan Account</h1>
  <div class="field">
    <label class="label" for="nic">NIC</label>
    <div class="control">
      <input class="input" name="nic" type="tel" v-model="nic" v-mask="'#####-#######-#'" placeholder="NIC">
    </div>
  </div>
  <div class="field">
    <label class="label" for="password">Password</label>
    <div class="control">
      <input class="input" name="password" type="password" v-model="password" placeholder="Password">
    </div>
  </div>
  <button v-on:click="doLogin()" class="mt2 button is-primary is-fullwidth">Log In</button>
  <div class="flex flex-center flex-column mt2 mb2">
    <h3 class="mb0 mt1">Don't have a Pehchan Account?</h3>
    <router-link class="button is-secondary mt2 is-fullwidth" :to="signupUrl">Sign up</router-link>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Login extends Vue {
  nic = '';

  password = '';

  challenge = '';

  signupUrl = `/signup/enter-cnic/?login_challenge=${this.$route.query.login_challenge}`;

  mounted() {
    this.challenge = (this.$route.query.login_challenge as string);
    console.log('got challenge', this.challenge);
    if (!this.challenge) {
      this.$router.push({ name: 'Home' });
    }
  }

  async doLogin() {
    console.log('doing login');
    const body = {
      nic: this.nic,
      password: this.password,
      login_challenge: this.challenge,
    };
    const response = await axios.post(`${process.env.VUE_APP_PEHCHAN_API_URL}/loginn`, body);
    console.log('got login response', response);
    if (response.data?.redirect_to) {
      window.location = response.data.redirect_to;
    }
  }
}
</script>

<style lang="scss" scoped></style>
