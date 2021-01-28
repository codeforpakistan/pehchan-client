<template>
  <div class="pehchan-landing">
    <p class="mb2">Choose an account to continue with {{referrerApp}}.</p>
    <div class="mb1 flex flex-center logged-in-accounts" v-for="name in ['Sakeena Mukhtar', 'Allah Ditta', 'Tufail Mansoor']" :key="name">
      <div class="account-dp"></div>
      <div class="ml1 mrauto account-name">{{name}}</div>
    </div>
    <div class="flex flex-center mt2">
      <router-link class="button is-secondary" to="/login">Add another account</router-link>
    </div>
    <div class="flex flex-center flex-column mt2">
      <h3 class="title is-5">Don't have a Pehchan Account?</h3>
      <router-link class="button is-primary mt2 is-fullwidth" to="/signup/enter-cnic">Sign up</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PehchanLanding extends Vue {
  @Prop() private msg!: string;

  referrerApp = 'Super App';
}
</script>

<style scoped lang="scss">

.logged-in-accounts {
  .account-dp {
    background-color: #005741;
    width: 2.5em;
    height: 2.5em;
    border-radius: 50%;
  }

  .account-name {
    font-size: 1.2em;
  }
}

.pehchan-landing {
  text-align: left;
  padding: 0 1.5em;

  p {
    font-size: 1.1em;
  }

  h3 {
    margin-bottom: 0;
  }
}

</style>
