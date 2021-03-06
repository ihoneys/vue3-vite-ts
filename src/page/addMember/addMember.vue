<template>
  <div class="add-member">
    <p class="member-tips">为防止黄牛贩卖号源，预约挂号采取实名制。请先补齐就诊人资料！</p>
    <van-form @submit="onSubmit">
      <van-field
        name="memberType"
        label="患者类型"
        input-align="right"
        :required="true"
        :rules="[{ required: true, message: '请勾选患者类型' }]"
      >
        <template #input>
          <van-radio-group v-model="member.memberType" direction="horizontal">
            <van-radio name="1" checked-color="#00D2C3">成人</van-radio>
            <van-radio name="0" checked-color="#00D2C3">儿童</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        name="patientName"
        v-model="member.patientName"
        maxlength="50"
        label="姓名"
        placeholder="请输入姓名"
        input-align="right"
        :required="true"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        readonly
        label="证件类型"
        placeholder="点击选择证件类型"
        input-align="right"
        :clickable="false"
        v-model="member.idName"
        name="idName"
        :required="true"
        :rules="[{ required: true, message: '请选择证件类型' }]"
        @click-input="showPicker = true"
      />
      <van-field
        name="patientId"
        v-model="member.patientId"
        maxlength="50"
        type
        label="证件号码"
        placeholder="请输入证件号码"
        input-align="right"
        @blur="onBlur"
        :required="true"
        :rules="[{ required: true, message: '请输入正确的证件号码', pattern: patternRegExp }]"
      />
      <van-field
        name="sex"
        label="性别"
        input-align="right"
        :required="true"
        :rules="[{ required: true, message: '请勾选性别' }]"
      >
        <template #input>
          <van-radio-group v-model="member.sex" direction="horizontal">
            <van-radio name="0" checked-color="#00D2C3">男</van-radio>
            <van-radio name="1" checked-color="#00D2C3">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        readonly
        name="birthDay"
        label="出生日期"
        placeholder="点击选择时间"
        input-align="right"
        :clickable="false"
        :required="true"
        v-model="member.birthDay"
        :rules="[{ required: true, message: '请选择出生日期' }]"
        @click-input="isPickerDate = true"
      />
      <van-field
        name="phone"
        maxlength="11"
        label="手机号"
        type="tel"
        placeholder="请输入手机号"
        input-align="right"
        :required="true"
        v-model="phone"
      />
      <van-field
        label="验证码"
        v-model="member.code"
        name="code"
        maxlength="6"
        :required="true"
        center
        clearable
        placeholder="请输入短信验证码"
        :rules="[{ required: true, message: '请输入短信验证码' }]"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            :disabled="isGetCode || !phoneRexg.test(phone)"
            @click.stop="onGetCode"
            >{{ codeText }}</van-button
          >
        </template>
      </van-field>
      <div class="member-btn">
        <van-button
          color="#ccc"
          style="width: 45%"
          round
          text="取 消"
          @click.stop="router.go(-1)"
        />
        <van-button
          round
          color="#18c0b5"
          style="width: 45%"
          native-type="submit"
          :text="buttonName"
        />
      </div>
      <div class="question">
        <span>如有疑问？</span>
        <a href="tel:+0755-26639961">0755-26639961</a>
      </div>
    </van-form>
    <van-popup v-model:show="isPickerDate" position="bottom">
      <van-datetime-picker
        v-model="pickerDate"
        type="date"
        title="选择年月日"
        @cancel="isPickerDate = false"
        @confirm="confirmDate"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="patientTypeList"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { addUserMember, queryMemberInfo } from '../../common/api'
import { getVerificationCode } from '../../hooks/signup'
import { patternObj, phoneRexg } from '../../common/regularData'
import {
  tranformPickerType,
  formateDate,
  byPatientIdGetBrithdayAndSex,
  encrypt,
} from '../../common/function'
import { SessionStorage, LocalStorage } from 'storage-manager-js'
import { Toast } from 'vant'
const date = new Date()
export default defineComponent({
  setup() {
    const router = useRouter()
    const { id } = useRoute().params
    const state = reactive({
      member: {
        birthDay: '',
        patientId: '',
        idName: '',
        patientName: '',
        sex: '',
        phone: '',
        code: '',
        memberType: '',
        idType: '',
      },
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
      patientTypeList: [],
      showPicker: false,
      isPickerDate: false,
    })
    onMounted(async () => {
      const isMemberId = LocalStorage.has('memberId')
      if (isMemberId) return
      const { data } = await queryMemberInfo()
      LocalStorage.set('memberId', data.memberId)
    })
    const buttonName = id === 'add' || id === 'orderAdd' ? '提交' : '修改'
    const assginment = (currentMember) => {
      for (const key in state.member) {
        if (key === 'idType') {
          state.member['idName'] = patternObj[currentMember[key]].name
        }
        if (currentMember[key] || currentMember[key] === 0) {
          state.member[key] = currentMember[key] + ''
        }
      }
    }
    if (id === 'update') {
      const currentMember = SessionStorage.get('currentMember')
      assginment(currentMember)
    }
    let patternRegExp = ''
    state.patientTypeList = tranformPickerType(SessionStorage.get('id_type'))
    const onSubmit = async (postData) => {
      console.log(postData)
      postData.phone = encrypt(postData.phone)
      postData.patientId = encrypt(postData.patientId)
      postData.patientName = encrypt(postData.patientName)
      postData.idType = state.member.idType
      postData.memberId = LocalStorage.get('memberId')
      postData.userId = LocalStorage.get('userInfo').userId
      postData.wechat = '1'
      postData.env = 0
      let res, message
      if (id === 'add' || id === 'orderAdd') {
        message = '添加成功'
        res = await addUserMember(postData)
      }
      if (id === 'update') {
        message = '修改成功'
        res = await addUserMember(postData)
      }
      if (res.success) {
        Toast({
          type: 'success',
          message,
          onClose: () => {
            router.go(-1)
          },
        })
      }
    }
    
    const { onGetCode, isGetCode, codeText, countDown, phone } = getVerificationCode()

    const onBlur = () => {
      if (state.member.idType !== '01') return
      const { birthDay, radio } = byPatientIdGetBrithdayAndSex(state.member.patientId)
      if (birthDay || radio) {
        state.member.birthDay = birthDay
        state.member.sex = radio
      }
    }
    const onConfirm = (value) => {
      console.log(value)
      state.member.idName = value.text
      state.member.idType = value.value
      state.showPicker = false
      if (patternObj[value.value]) {
        patternRegExp = patternObj[value.value].rules
      }
    }
    const confirmDate = (value) => {
      const date = formateDate(value, false)
      state.isPickerDate = false
      state.member.birthDay = date
    }
    return {
      ...toRefs(state),
      phone,
      onConfirm,
      onGetCode,
      onSubmit,
      confirmDate,
      onBlur,
      phoneRexg,
      patternRegExp,
      buttonName,
      router,
      isGetCode,
      codeText,
      countDown,
    }
  },
})
</script>

<style lang="scss" scoped>
.add-member :deep() .van-field__error-message {
  text-align: right;
}
.add-member {
  padding: 14px;
}
.member-tips {
  color: #999999;
  font-size: 14px;
}
.member-btn {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}
.question {
  text-align: center;
  margin-top: 20px;
  a {
    text-decoration: underline;
  }
}
</style>
