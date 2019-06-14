<template>
  <div>
    <loan-card title="借款金额">
      <van-field name='借款金额' 
        v-validate="{required: true, regex: /^([0-9]+)$/}" 
        v-model="loanSum" 
        placeholder="请输入金额"
        step="100"
        :error-message="errors.first('借款金额')" />
    </loan-card>

    <loan-card title="借款信息">
      <van-cell-group>
        <van-field name='借款期限'
          label="借款期限(月)" 
          v-model="deadlineText"
          v-validate="'required'"
          :error-message="errors.first('借款期限')" readonly 
          placeholder="请选择借款期限"
          @click="popup.deadline = true" />
        <van-field 
          label="借款用途" 
          v-model="purposeText"
          :error-message="errors.first('借款用途')" readonly 
          placeholder="请选择借款用途"
          @click="popup.purpose = true" />
      </van-cell-group>
    </loan-card>
    <van-popup v-model="popup.deadline" position="bottom" :overlay="true">
      <van-picker
        value-key="value" 
        show-toolbar title="借款期限(月)" 
        :columns="deadlineColumns" 
        @cancel="popup.deadline = false" 
        @confirm="onConfirmDeadline" />
    </van-popup>
    <van-popup v-model="popup.purpose" position="bottom" :overlay="true">
      <van-picker
        value-key="value" 
        show-toolbar title="借款用途" 
        :columns="purposeColumns" 
        @cancel="popup.purpose = false" 
        @confirm="onConfirmPurpose" />
    </van-popup>
    <van-button class='submit-btn' size="large" type="primary" @click="handleSubmit()">提交</van-button>
  </div>
</template>

<script>
import Card from '@/components/Card';
import { submitApply } from '@/services/loanApply';
import { REQUEST_RESULT } from '@/constants/index';

export default {
  name: 'LoanApply',
  components: {
    [Card.name]: Card,
  },
  mounted() {
    this.$store.dispatch('loanApply/getData', { id: 1 });
  },
  methods: {
    async handleSubmit() {
      await this.$validator.validateAll();
      if (this.errors.count() !== 0) {
        this.$toast.fail('表单有误，请重新输入');
        return;
      }
      const data = {
        loanSum: this.loanSum,
        deadLineValue: this.deadLineValue,
        purposeValue: this.purposeValue,
      };
      const toast = this.$toast.loading({
        duration: 0,
        mask: true,
        loadingType: 'spinner',
        message: '提交中',
      });
      const { code } = await submitApply(data);
      if (code === REQUEST_RESULT.success) {
        toast.clear();
        this.$toast.success({
          message: '提交成功',
          forbidClick: true,
        });
      } else {
        toast.clear();
      }
      console.log('loanApply sumbit data>>', data);
      setTimeout(() => {
        // todo 跳转
      }, 1e3);
      // this.$router.push('/');
    },
    onConfirmDeadline({ value, key }) {
      this.deadlineText = value;
      this.deadLineValue = key;
      this.popup.deadline = false;
    },
    onConfirmPurpose({ value, key }) {
      this.purposeText = value;
      this.purposeValue = key;
      this.popup.purpose = false;
    },
  },
  data() {
    return {
      popup: {
        purpose: false,
        deadline: false,
      },
      loanSum: '',
      deadlineText: '',
      deadLineValue: '',
      purposeText: '',
      purposeValue: '',
      popupShow: false,
      purposeColumns: [
        { value: '买车', key: '01' },
        { value: '买房', key: '02' },
        { value: '买船', key: '03' },
      ],
      deadlineColumns: [
        { value: '3', key: '3' },
        { value: '9', key: '9' },
        { value: '12', key: '12' },
      ],
    };
  },
};
</script>

<style>
.submit-btn {
  position: fixed;
  bottom: 0;
}
</style>
