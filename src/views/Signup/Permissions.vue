<template>
  <div class="mt2 ml1 mr1 mb1" v-if="showContent">
    <h1>Super App</h1>
    <h4>Super App will receive the following permissions</h4>
    <ul style="text-align: left; margin-left: 2em; list-style-type: circle; margin-top: 1em;">
      <li>Your name</li>
      <li>Email address</li>
      <li>CNIC</li>
    </ul>
    <div class="rememberThis mt1">
      <label for="remember">Remember this</label>
      <input type="checkbox" id="remember" value="false" v-model="remember">
    </div>
    <button class="mt2 button is-primary is-fullwidth" v-on:click="consent()">
      Continue
    </button>
    <button class="mt2 button is-secondary is-fullwidth" v-on:click="closeWindow()">
      Cancel
    </button>
  </div>
</template>

<style lang="scss" scoped>
div.rememberThis {
  text-align: left;
  margin-left: 1em;
  label {
    margin-right: 10px;
    font-weight: 500;
  }
  input {
    width: 15px;
    height: 15px;
  }
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import emitter from '../../emitter';

@Component
export default class Login extends Vue {
  challenge = '';

  remember = false;

  showContent = false;

  async mounted() {
    emitter.emit('loading', true);
    this.challenge = (this.$route.query.consent_challenge as string);
    console.log('got challenge', this.challenge);
    // skip this if already has provided permissions
    await this.hasRememeberMe();
    this.showContent = true;
    emitter.emit('loading', false);
    if (!this.challenge) {
      this.$router.push({ name: 'Home' });
    }
  }

  async hasRememeberMe() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const body = {
      consent_challenge: this.challenge,
      nic: user.nic.replace(/-/g, ''),
    };
    console.log('sending data', body);
    const response = await axios.post(`${process.env.VUE_APP_PEHCHAN_API_URL}/consent_skip`, body);
    console.log('got consent skip response', response);
    if (response.data?.skip) {
      window.location = response.data.redirect_to;
    }
  }

  async consent() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const body = {
      requested_scope: ['openid', 'offline', 'photos.read'],
      remember: this.remember,
      consent_challenge: this.challenge,
      nic: user.nic.replace(/-/g, ''),
    };
    console.log('sending data', body);
    const response = await axios.post(`${process.env.VUE_APP_PEHCHAN_API_URL}/consentt`, body);
    console.log('got consent response', response);
    if (response.data?.redirect_to) {
      emitter.emit('loading', true);
      window.location = response.data.redirect_to;
    }
  }

  closeWindow() {
    const closeURL: any = `${process.env.VUE_APP_OAUTH_URL}/cancel-auth`;
    window.location = closeURL;
  }
}

</script>
