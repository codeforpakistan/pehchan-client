<template>
  <div class="login">
    <h1 class="title is-4">Log into Pehchan Account</h1>
    <div class="field">
      <label class="label" for="email">Email</label>
      <div class="control">
        <input class="input" name="email" type="email" placeholder="Email">
      </div>
    </div>
    <div class="field">
      <label class="label" for="password">Password</label>
      <div class="control">
        <input class="input" name="password" type="password" placeholder="Password">
      </div>
    </div>
    <div class="control">
      <button v-on:click="doLogin()" class="b-login button is-primary is-fullwidth">Log In</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  count = 0;

  doLogin() {
    console.log('doing login');
    // do login here. redirect to 2FA after successful login.
    this.redirectTo2FA();
  }

  redirectTo2FA() {
    console.log('running 2FA');
  }
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
