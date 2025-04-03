export interface AuthCredentials {
  email: string;
  passwd: string;
  lang: string;
  time_stamp: number;
  phoneNumber?: string;
  phone_verifyCode?: string;
}

export interface AuthRequest {
  req_string: string;
}

export interface AuthResponse {
  is_test_account: boolean;
  lang: string;
  market: string;
  status: number;
  subAccount: string;
  token: string;
  phoneNumber?: string;
  isFirstLoginDaily?: boolean;
}

export interface VerifyMailCodeReq {
  lang: string;
  email: string;
}

export interface ResetPwdVerifyMailCodeReq {
  lang: string;
  email: string;
}

export interface RegisterReq {
  req_string: string;
}

export interface RegisterAuthReq {
  account: string;
  country_pk: string;
  email: string;
  passwd: string;
  verity_mail: string;
  invitation_code: string;
  lang: string;
  time_stamp: number;
}

export interface RegisterPhoneAuthReq {
  time_stamp: number;
  lang: string;
  account: string;
  country_pk: string;
  email?: string;
  mobile_country: string;
  mobile: string;
  passwd: string;
  verity_mail?: string;
  verify_phone: string;
  invitation_code: string;
}

export interface SignIn1Req {
  time_stamp: number;
  email: string;
  passwd: string;
  lang: string;
}

export interface SignIn1Res {
  token: string;
  subAccount: string;
  status: number;
  market: string;
  is_test_account: boolean;
  lang: string;
}

export interface SignInReq {
  req_string: string;
}

export interface SignInRes {
  token: string;
  subAccount: string;
  status: number;
  market: string;
  is_test_account: boolean;
  lang: string;
}

export interface SignOutReq {
  time_stamp: number;
  lang: string;
}

export interface ResetPasswordReq {
  req_string: string;
}

export interface ResetPhoneNumReq {
  req_string: string;
}

export interface VerifyIdentityReq {
  name: string;
  mobile_country: string;
  mobile: string;
  id_type: number;
  id_number: string;
  img_front: string;
  lang: string;
}

export interface GetTaskReq {
  time_stamp: number;
  lang: string;
}

export interface GetTaskRes {
  id: string;
  title: string;
  content: string;
  reward: number;
  isCompleted: boolean;
  currency: string;
}

export interface PasswordApplyReq {
  req_string: string;
}

export interface ForgotPwdPhoneReq {
  phone: string;
  phone_verifyCode: string;
  newpasswd: string;
  lang: string;
  time_stamp: number;
}

export interface ForgotPwdReq {
  email: string;
  email_verifyCode: string;
  newpasswd: string;
  lang: string;
  time_stamp: number;
}

export interface GetSettingReq {
  time_stamp: number;
  lang: string;
}
export interface GetSettingRes {
  avatar: string;
  email: string;
  phoneNumber: string;
  isRealNameVerified: boolean;
  dateFormat: number;
  authStatus: number;
  alreadySetPaypwd: boolean;
  stock_chart_setting: number;
  enable_auto_transfer: number;
  need_withdraw_selfie: number;
  lang: string;
}

export interface SendSMSVerifyReq {
  countryCode: string;
  phoneNumber: string;
  lang: string;
}

export interface VerifySMSCodeReq {
  countryCode: string;
  phoneNumber: string;
  verificationCode: string;
  lang: string;
}

export interface CheckPhoneAuthReq {
  countryCode: string;
  phoneNumber: string;
  lang: string;
}

export interface SendPhoneVerifyReq {
  countryCode: string;
  phoneNumber: string;
  lang: string;
}

export interface IsFinishAuthReq {
  time_stamp: number;
  lang: string;
}

export interface VerifyPhoneCodeReq {
  countryCode: string;
  phoneNumber: string;
  verificationCode: string;
  lang: string;
}

export interface GetNotifyReq {
  time_stamp: number;
  lang: string;
}

export interface GetNotifyRes {
  emailNotify: boolean;
  siteMessageNotify: boolean;
  accountAlertNotify: boolean;
  accountMarginCallNotify: boolean;
  stockTransactionNotify: boolean;
  accountExpiryNotify: number;
  promotionsNotify: boolean;
  depositApprovedNotify: boolean;
  withdrawalApprovedNotify: boolean;
  tradingAccountApprovedNotify: boolean;
}

export interface SetNotifyReq {
  emailNotify: boolean;
  siteMessageNotify: boolean;
  accountAlertNotify: boolean;
  accountMarginCallNotify: boolean;
  stockTransactionNotify: boolean;
  accountExpiryNotify: number;
  promotionsNotify: boolean;
  depositApprovedNotify: boolean;
  withdrawalApprovedNotify: boolean;
  tradingAccountApprovedNotify: boolean;
  lang: string;
}

export interface SetRichBoxAutoTransferReq {
  enable_auto_transfer: number;
  lang: string;
}

export interface SetStockChartReq {
  stock_chart_setting: number;
  lang: string;
}

// --- /Member/getinvitationinfo ---
export interface GetInvitationInfoReq {
  time_stamp: number;
  lang: string;
}
export interface GetInvitationInfoRes {
  invitationCode: string;
  invitationURL: string;
  is_test_account: boolean;
}

export interface SetPayPasswordReq {
  req_string: string;
}

export interface ResetPayPasswordReq {
  req_string: string;
}

export interface SetMemberLangReq {
  time_stamp: 0;
  lang: string;
}
