<template>
  <div class="login mt2 ml1 mr1">
    <h1 class="mt3 mb2">Log into Pehchan Account</h1>
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
    <button v-on:click="doLogin()" class="mt2 button is-primary is-fullwidth">Log In</button>
    <div class="flex flex-center flex-column mt2 mb2">
      <h3 class="mb0 mt1">Don't have a Pehchan Account?</h3>
      <router-link class="button is-secondary mt2 is-fullwidth" to="/signup/enter-cnic">Sign up</router-link>
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
    this.redirectTo2FA();
  }

  redirectTo2FA() {
    console.log('running 2FA');
  }
}

</script>

<style lang="scss" scoped></style>
