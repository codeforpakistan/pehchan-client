<template>
  <div class="mt2 ml1 mr1">
    <h1 class="title is-4">Create a new Pehchan Account</h1>
    <div class="field">
      <label class="label" for="id-card-number">ID Card Number</label>
      <div class="control">
        <input class="input" name="id-card-number" type="number" placeholder="ID Card Number">
      </div>
    </div>
    <router-link class="mt2 button is-primary is-fullwidth" to="/signup/verify-identity">Submit</router-link>
    <div class="flex flex-center flex-column mt2 mb2">
      <h3 class="mb0 mt1">Already have an account?</h3>
      <router-link class="button is-secondary mt2 is-fullwidth" to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

}

</script>

<style lang="scss" scoped></style>
