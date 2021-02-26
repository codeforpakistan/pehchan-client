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
    <div class="field">
      <label class="label" for="password">New Password</label>
      <div class="control">
        <input class="input" name="password" type="password" v-model="password" placeholder="Your new password">
      </div>
    </div>
    <div class="control">
      <button v-on:click="doSignup()" class="mt2 button is-primary is-fullwidth" :disabled="code == null || code.length < 6">
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
import axios from 'axios';

@Component
export default class Login extends Vue {
  phone = this.$route.query.phone;

  password = '';

  code = null;

  mounted() {
    console.log('got phone', this.phone);
  }

  async doSignup() {
    const user = JSON.parse(localStorage.getItem('user') as string);
    try {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/auth/verify-number`, { phone: this.phone, code: this.code });
      console.log('got verify-number response', response);
      if (response.data?.success) {
        const name = `randomuser${Math.floor(Math.random() * 100)}`;
        const body = {
          nic: user.nic.replace(/-/g, ''),
          email: `${name}@gmail.com`,
          phone: user.phone.replace(/[-+()\s]/g, ''),
          password: this.password,
          login_challenge: this.$route.query.login_challenge,
          name,
        };
        console.log('sending body', body);
        const createUserResponse = await axios.post(`${process.env.VUE_APP_PEHCHAN_API_URL}/users`, body);
        console.log('got crete user response', createUserResponse);
        if (createUserResponse.data?.redirect_to) {
          window.location = createUserResponse.data.redirect_to;
        }
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
