<template>
  <div class="mt2 ml1 mr1">
    <div class="form-header">
      <h1 class="mt0 mb1">PEHCHAAN</h1>
      <p class="is-primary">A digital identity linked with NADRA</p>
    </div>
    <h1 class="mb1 mt2">Please confirm your phone.</h1>
    <p class="mb2">A verification code has been sent to your phone number. Enter it below to verify your contact information.</p>
    <div class="field">
      <label class="label" for="phone-code">Enter Code (Sent to {{phone}})</label>
      <div class="control">
        <input class="input" name="phone-code" type="text" v-model="code" v-mask="'######'" placeholder="6 digit code">
      </div>
    </div>
     <div class="field">
      <label class="label text-link has-text-centered" for="phone-code">Did not receive the code? <span class="link">Resend</span></label>
    </div>
    <div class="field">
      <label class="label mt1" for="password">New Password</label>
      <div class="control password-input">
        <input class="input" required name="password" :type="type" v-model="password" placeholder="Password">
        <span @click="showPassword">
          <font-awesome-icon v-if="type==='password'" :icon="['fas', 'eye']" />
          <font-awesome-icon v-if="type==='text'" :icon="['fas', 'eye-slash']" />
        </span>
      </div>
    </div>
    <div class="control">
      <button v-on:click="doSignup()" class="mt2 button is-primary is-fullwidth" :disabled="code == null || code.length < 6">
        Submit
      </button>
      <router-link class="mt2 mb1 button is-secondary is-fullwidth" to="/signup/enter-contact">
        Change Number or Email
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import emitter from '../../emitter';

@Component
export default class Login extends Vue {
  phone = this.$route.query.phone;

  password = '';

  type = 'password';

  code = null;

  mounted() {
    console.log('got phone', this.phone);
  }

  showPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
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
          emitter.emit('loading', true);
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
