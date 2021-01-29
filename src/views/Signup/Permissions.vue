<template>
  <div class="mt2 ml1 mr1 mb1">
    <h1>Super App</h1>
    <h4>Super App will receive the following permissions</h4>
    <ul style="text-align: left; margin-left: 2em; list-style-type: circle; margin-top: 1em;">
      <li>Your name</li>
      <li>Email address</li>
      <li>CNIC</li>
    </ul>
    <router-link class="mt2 button is-primary is-fullwidth" to="/signup/success">
      Continue
    </router-link>
    <button class="mt2 button is-secondary is-fullwidth" v-on:click="closeWindow()">
      Cancel
    </button>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  mounted() {}
}

</script>
