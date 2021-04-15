<template>
  <div class="login mt2 ml1 mr1">
    <div class="form-header">
      <h1 class="mt2 mb1">PEHCHAAN</h1>
      <p class="is-primary">A digital identity linked with NADRA</p>
    </div>
    <h1 class="mt2 mb2">Please enter your contact information</h1>
    <form v-on:submit="submitContact">
      <div class="field">
        <label class="label" for="phone">Phone Number</label>
        <div class="control">
          <input class="input" name="phone" type="tel" required v-model="phone" v-mask="'+92 (###) ###-####'" placeholder="Phone Number">
        </div>
      </div>
      <div class="control mb2">
        <button class="mt2 button is-primary is-fullwidth" :disabled="phone.length < 18">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Login extends Vue {
  phone = '';

  email = '';

  async submitContact(e: any) {
    e.preventDefault();
    console.log('submitting contact info', this.phone);
    try {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/send-verify-code`, { phone: this.phone });
      console.log('got send verify code response', response);
      if (response.data?.success) {
        const user = JSON.parse(localStorage.getItem('user') as string);
        user.phone = this.phone;
        localStorage.setItem('user', JSON.stringify(user));
        this.$router.push({ name: 'ConfirmContact', query: { phone: this.phone, login_challenge: this.$route.query.login_challenge } });
      }
    } catch (err) {
      console.error('got error in submitting contact info', err);
    }
  }
}

</script>

<style lang="scss" scoped></style>
