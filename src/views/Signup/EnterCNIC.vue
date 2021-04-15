<template>
  <div class="form-header mt2 ml1 mr1">
    <h1 class="mt2 mb1">PEHCHAAN</h1>
    <p class="mb1 is-primary">A digital identity linked with NADRA</p>
    <p style="text-align: left; font-weight: 550;" class="mt3 mb1">Create a new Pehchan Account</p>
    <form v-on:submit="next">
      <div class="field">
        <label class="label" for="nic">CNIC <span class="light-text">(without dashes)</span> <span class="required-asterisk">*</span></label>
        <div class="control">
          <input class="input" name="id-card-number" type="tel" required v-model="nic" v-mask="'#####-#######-#'" placeholder="ID Card Number">
        </div>
      </div>
      <b-field style="text-align:left;">
        <b-checkbox class="text-link" required v-model="agreeTC" type="is-primary">
          I agree with Pehchaan <span class="link">Terms & Conditions</span>
        </b-checkbox>
      </b-field>
      <button class="mt2 button is-primary is-fullwidth" type="submit">Submit</button>
    </form>
    <div class="flex flex-center flex-column mt2 mb2">
      <h4 style="font-weight: 540;" class="mb0 mt1">Already have an account?</h4>
      <router-link class="button is-secondary mt0 is-fullwidth" to="/login">Log In</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  nextUrl = `/signup/verify-identity/?login_challenge=${this.$route.query.login_challenge}`;

  nic = '';

  agreeTC = false;

  async next(e: any) {
    e.preventDefault();
    if (this.agreeTC) {
      const user = {
        nic: this.nic,
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.$router.push({ name: 'VerifyIdentity', query: { login_challenge: this.$route.query.login_challenge } });
    }
  }
}

</script>

<style lang="scss" scoped></style>
