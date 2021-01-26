<template>
  <div class="login">
    <h1 class="title is-4">Please confirm your email and phone.</h1>
    <p class="mb2">A verification code has been sent to your email and phone number. Enter them below to verify your contact information.</p>
    <div class="field">
      <label class="label" for="email-code">Email Code (Sent to jamalkhan@gmail.com)</label>
      <div class="control">
        <input class="input" name="email-code" type="text" placeholder="Email Code">
      </div>
    </div>
    <div class="field">
      <label class="label" for="phone-code">Phone Number Code (Sent to +923215234914)</label>
      <div class="control">
        <input class="input" name="phone-code" type="text" placeholder="Phone Number Code">
      </div>
    </div>
    <div class="control">
      <button v-on:click="doLogin()" class="b-login button is-primary is-fullwidth">
        Submit
      </button>
      <router-link class="b-login button is-light is-info is-fullwidth" to="/signup/enter-contact">
        Change Number or Email
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

}

</script>

<style lang="scss" scoped>
  .login {
    margin: 2em 1em 0;
  }
  h1 {
    margin-top: 3em;
    margin-bottom: 2em !important;
  }
  .b-login {
    margin-top: 2em;
  }
</style>
