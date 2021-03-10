<template>
  <div class="mt2 ml1 mr1 mb1">
    <div v-if="renderUI">
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
    <div v-if="!renderUI">
      <label>Please wait..</label>
    </div>
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

  renderUI = false;

  async created() {
    try {
      emitter.emit('loading', true);
      const consentChallenge = window.location.href.split('consent_challenge=');
      if (consentChallenge.length > 1) {
        console.log('url', consentChallenge[1]);
        await this.hasRememeberMe(consentChallenge[1]);
      }
    } catch (err) {
      console.log(err);
      emitter.emit('loading', false);
    }
  }

  async mounted() {
    setTimeout(() => {
      this.renderUI = true;
    }, 3500);
    this.challenge = (this.$route.query.consent_challenge as string);
    console.log('got challenge', this.challenge);
    if (!this.challenge) {
      this.$router.push({ name: 'Home' });
    }
    emitter.emit('loading', false);
  }

  async hasRememeberMe(challenge: string) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const body = {
      consent_challenge: challenge,
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
