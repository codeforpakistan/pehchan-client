<template>
  <div class="mt2 ml1 mr1 mb1">
    <h1>Super App</h1>
    <h4>Super App will receive the following permissions</h4>
    <ul style="text-align: left; margin-left: 2em; list-style-type: circle; margin-top: 1em;">
      <li>Your name</li>
      <li>Email address</li>
      <li>CNIC</li>
    </ul>
    <button class="mt2 button is-primary is-fullwidth" v-on:click="consent()">
      Continue
    </button>
    <button class="mt2 button is-secondary is-fullwidth" v-on:click="closeWindow()">
      Cancel
    </button>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import fetch from 'node-fetch';

@Component
export default class Login extends Vue {
  challenge = '';

  mounted() {
    this.challenge = (this.$route.query.consent_challenge as string);
    console.log('got challenge', this.challenge);
    if (!this.challenge) {
      this.$router.push({ name: 'Home' });
    }
  }

  async consent() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        requested_scope: ['openid', 'offline', 'photos.read'],
        remember: false,
        consent_challenge: this.challenge,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('sending data', options);
    const response = await fetch(`${process.env.VUE_APP_PEHCHAN_API_URL}/consentt`, options);
    const data = await response.json();
    console.log('got consent response', data);
    if (data.redirect_to) {
      window.location = data.redirect_to;
    }
  }
}

</script>
