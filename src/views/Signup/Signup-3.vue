<template>
  <div class="login">
    <h1 class="title is-4">Please enter your contact information</h1>
    <div class="field">
      <label class="label" for="email">Email</label>
      <div class="control">
        <input class="input" name="email" type="email" placeholder="Email">
      </div>
    </div>
    <div class="field">
      <label class="label" for="phone">Phone Number</label>
      <div class="control">
        <input class="input" name="phone" type="tel" placeholder="Phone Number">
      </div>
    </div>
    <div class="control">
      <router-link class="b-login button is-primary is-fullwidth" to="/signup/confirm-contact">
        Submit
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
