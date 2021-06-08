<template>
  <div class="mt2 ml1 mr1">
    <div class="form-header">
      <h1 class="mt0 mb1">PEHCHAAN</h1>
      <p class="is-primary">A digital identity linked with NADRA</p>
    </div>
    <h1 v-if="!resetPassFlow" class="mb1 mt2">Please confirm your phone.</h1>
    <h1 v-if="resetPassFlow && !resetCodeVerified" class="mb1 mt2">Enter the reset code.</h1>
    <h1 v-if="resetPassFlow && resetCodeVerified" class="mb1 mt2">Set your new Password.</h1>
    <p class="mb2" v-if="!resetCodeVerified">A verification code has been sent to your phone number. Enter it below to verify your contact information.</p>
    <div class="field" v-if="!resetCodeVerified">
      <label class="label" for="phone-code">Enter Code <span v-if="!resetPassFlow">(Sent to {{phone}})</span></label>
      <div class="control">
        <input class="input" name="phone-code" type="text" v-model="code" v-mask="'#####'" placeholder="5 digit code">
      </div>
    </div>
     <div v-if="!resetCodeVerified" class="field">
      <label class="label text-link has-text-centered" for="phone-code">Did not receive the code? <span @click="sendResetCode(true)" class="link">Resend</span></label>
    </div>
    <div v-if="!resetPassFlow || resetCodeVerified" class="field">
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
      <button v-on:click="doSignup()" class="mt2 button is-primary is-fullwidth" :disabled="code == null || code.length < 5">
        Submit
      </button>
      <router-link v-if="!resetPassFlow" class="mt2 mb1 button is-secondary is-fullwidth" to="/signup/enter-contact">
        Change Number or Email
      </router-link>
    </div>
    <div v-if="errorMsg" class="field" style="text-align: center;">
      <span style="color: red;">{{errorMsg}}</span>
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
  phone: any = this.$route.query.phone || '';

  password = '';

  type = 'password';

  resetPassFlow = false;

  nic: any = '';

  resetReqSent = false;

  resetCodeVerified = false;

  errorMsg = '';

  resendTimeout = 0;

  code = null;

  mounted() {
    console.log('got phone', this.phone);
    const { query } = this.$route;
    if (query?.resetPass === 'true') {
      this.resetPassFlow = true;
      this.nic = query.nic;
    }
  }

  countDownTimer() {
    if (this.resendTimeout > 0) {
      setTimeout(() => {
        this.resendTimeout -= 1;
        this.countDownTimer();
      }, 1000);
    }
  }

  async sendResetCode(resend = false) {
    this.errorMsg = '';
    const resetCodeResp = await axios.get(`${process.env.VUE_APP_PEHCHAN_API_URL}/send-verify-code/${this.nic}`);
    console.log('got reset pass response', resetCodeResp);
    if (!resetCodeResp?.data?.success) {
      this.errorMsg = 'Something went wrong.';
    } else if (!resend) {
      this.$router.push({ name: 'ConfirmContact', query: { resetPass: 'true' } });
    }
  }

  async verifyResetCode() {
    try {
      this.errorMsg = '';
      const resetCodeResp = await axios.get(`${process.env.VUE_APP_PEHCHAN_API_URL}/verify-number/${this.nic}/${this.code}`);
      console.log('got reset pass response', resetCodeResp);
      if (!resetCodeResp?.data?.verify) {
        this.errorMsg = 'Reset code is invalid';
      } else {
        this.resetCodeVerified = true;
      }
    } catch (err) {
      console.error(err);
      this.errorMsg = 'Error updating password, Please contact support';
    }
  }

  showPassword() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }

  async updatePassword() {
    try {
      this.errorMsg = '';
      const updateResp = await axios.put(`${process.env.VUE_APP_PEHCHAN_API_URL}/users/nic/${this.nic}`, { password: this.password });
      if (updateResp?.data?.success) {
        // console.log('aaa', localStorage.getItem('resetPassRedirect'));
        window.location.href = localStorage.getItem('resetPassRedirect') || '/';
      } else {
        this.errorMsg = 'Error updating password, Please contact support';
      }
    } catch (err) {
      console.error(err);
      this.errorMsg = 'Error updating password, Please contact support';
    }
  }

  async doSignup() {
    if (this.resetPassFlow) {
      if (!this.resetCodeVerified) {
        await this.verifyResetCode();
      } else {
        // update password
        await this.updatePassword();
      }
    } else {
      const user = JSON.parse(localStorage.getItem('user') as string);
      try {
        const headers = {
          'X-API-Key': '60acd9c1-034f-443a-ac6c-50fdaf3a9b7a',
        };
        const plainPhone = this.phone?.replace(/\D+/g, '');
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/auth/verify-number?recipient=${plainPhone}&code=${this.code}`, { headers });
        console.log('got verify-number response', response);
        if (response.data?.verify) {
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
}

</script>
