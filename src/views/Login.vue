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
    <router-link class="button is-secondary mt2 is-fullwidth" to="/signup/enter-cnic">Sign up</router-link>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import fetch from 'node-fetch';

@Component
export default class Login extends Vue {
  nic = '';

  password = '';

  challenge = '';

  mounted() {
    this.challenge = (this.$route.query.login_challenge as string);
    console.log('got challenge', this.challenge);
    if (!this.challenge) {
      this.$router.push({ name: 'Home' });
    }
  }

  async doLogin() {
    console.log('doing login');
    const options = {
      method: 'POST',
      body: JSON.stringify({
        nic: this.nic,
        password: this.password,
        login_challenge: this.challenge,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('sending data', options);
    const response = await fetch(`${process.env.VUE_APP_PEHCHAN_API_URL}/loginn`, options);
    const data = await response.json();
    console.log('got login response', data);
    if (data.redirect_to) {
      window.location = data.redirect_to;
    }
    if (data.success) {
      // this.$router.push({ name: 'ConfirmContact', query: { phone: this.phone } });
    }
    this.redirectTo2FA();
  }

  redirectTo2FA() {
    console.log('running 2FA');
  }
}
</script>

<style lang="scss" scoped></style>
