export interface NameReq {
  appkey: string;
  lang: string;
}

export interface NameRes {
  name: string;
}

export interface ConfigReq {
  appkey: string;
  lang: string;
}

export interface AppLogoReq {
  appkey: string;
  lang: string;
}

export interface AppLogoRes {
  icon_login_logo: string;
  dwapp_logo: string;
  dwap_bg: string;
  logo: string;
  bg_popularize: string;
  dw_ios: string;
  dw_android: string;
}

export interface AppThemeReq {
  appkey: string;
  lang: string;
}

export interface AppThemeRes {
  color: string;
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
