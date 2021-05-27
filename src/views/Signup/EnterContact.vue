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
    const headers = {
      'X-API-Key': '60acd9c1-034f-443a-ac6c-50fdaf3a9b7a',
    };
    try {
      const plainPhone = this.phone.replace(/\D+/g, '');
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/auth/send-verify-code?recipient=${plainPhone}`,
        { headers });
      console.log('got send verify code response', response);
      if (response.data?.status === 'Success') {
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
