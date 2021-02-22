<template>
  <div class="mt2 ml1 mr1">
    <h1 class="mb2">Please confirm your phone.</h1>
    <p class="mb2">A verification code has been sent to your phone number. Enter it below to verify your contact information.</p>
    <div class="field">
      <label class="label" for="phone-code">Phone Number Code (Sent to {{phone}})</label>
      <div class="control">
        <input class="input" name="phone-code" type="text" v-model="code" v-mask="'######'" placeholder="Phone Number Code">
      </div>
    </div>
    <div class="control">
      <button v-on:click="doLogin()" class="mt2 button is-primary is-fullwidth" :disabled="code == null || code.length < 6">
        Submit
      </button>
      <router-link class="mt2 button is-secondary is-fullwidth" to="/signup/enter-contact">
        Change Number or Email
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import fetch from 'node-fetch';

@Component
export default class Login extends Vue {
  phone = this.$route.query.phone;

  code = null;

  mounted() {
    console.log('got phone', this.phone);
  }

  async doLogin() {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        phone: this.phone,
        code: this.code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetch(`${process.env.VUE_APP_API_URL}/auth/verify-number`, options);
      const data = await response.json();
      console.log('got verify-number response', data);
      if (data.success) {
        this.$router.push({ name: 'Permissions' });
      } else {
        alert('Failed to verify number. Please check your number and code.');
      }
    } catch (err) {
      console.error('got error in submitting contact info', err);
      alert('Failed to verify number. Please check your number and code.');
    }
  }
}

</script>
