<template>
  <div class="login">
    <h1 class="title is-4">Create a new Pehchan Account</h1>
    <div class="field">
      <label class="label" for="id-card-number">ID Card Number</label>
      <div class="control">
        <input class="input" name="id-card-number" type="number" placeholder="ID Card Number">
      </div>
    </div>
    <div class="control">
      <router-link class="b-login button is-primary is-fullwidth" to="/signup/verify-identity">
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
