<template>
  <div class="mt2 ml1 mr1 mb2">
    <h1>Successfully created account</h1>
    <h4>Click the button below to go back to {{appName}}.</h4>
    <a :href="redirectUrl" class="mt2 button is-secondary is-fullwidth">
      Go to {{appName}}
    </a>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  appName = '';

  redirectUrl = '';

  mounted() {
    this.appName = (localStorage.getItem('appName') as string);
    this.redirectUrl = (localStorage.getItem('redirectUrl') as string);
  }
}

</script>
