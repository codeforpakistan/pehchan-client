<template>
  <div class="pehchan-landing">
    <router-link class="button" to="/login">Log in</router-link>
    <h3 class="title is-5">Don't have a Pehchan Account?</h3>
    <router-link class="button" to="/signup/enter-cnic">Sign up</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PehchanLanding extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pehchan-landing {
  margin-top: 3em;
  h3 {
    margin-bottom: 0;
  }
  .button {
    margin: 2em 0;
  }
}
a {
  color: #42b983;
}
</style>
