import {
  AuthCredentials,
  AuthRequest,
  AuthResponse,
  CheckPhoneAuthReq,
  GetInvitationInfoReq,
  GetInvitationInfoRes,
  GetNotifyReq,
  GetNotifyRes,
  GetSettingReq,
  GetSettingRes,
  GetTaskReq,
  GetTaskRes,
  IsFinishAuthReq,
  PasswordApplyReq,
  RegisterReq,
  ResetPwdVerifyMailCodeReq,
  SendPhoneVerifyReq,
  SendSMSVerifyReq,
  SetMemberLangReq,
  SetNotifyReq,
  SetPayPasswordReq,
  SetRichBoxAutoTransferReq,
  SetStockChartReq,
  SignIn1Req,
  SignIn1Res,
  SignInReq,
  SignInRes,
  SignOutReq,
  VerifyIdentityReq,
  VerifyMailCodeReq,
  VerifyPhoneCodeReq,
  VerifySMSCodeReq,
  RegisterAuthReq,
  ForgotPwdReq,
  RegisterPhoneAuthReq,
  ForgotPwdPhoneReq,
} from "@/types/member";
import { ApiService } from "./api.service";
import { encryptByAES } from "@/lib/encrypt";

export class MemberService {
  static async preLogin(credentials: AuthCredentials) {
    // Encrypt the credentials before sending them to the server
    const reqString = encryptByAES(JSON.stringify(credentials));
    return ApiService.post<AuthResponse, AuthRequest>("Member/presignin", {
      req_string: reqString,
    });
  }

  static async login(credentials: AuthCredentials) {
    // Encrypt the credentials before sending them to the server
    const reqString = encryptByAES(JSON.stringify(credentials));
    return ApiService.post<AuthResponse, AuthRequest>("Member/signinlp", {
      req_string: reqString,
    });
  }

  static async verifyMailCode(req: VerifyMailCodeReq) {
    return ApiService.post<undefined, VerifyMailCodeReq>(
      "Member/verifymailcode",
      req,
    );
  }

  static async resetPwdVerifyMailCode(req: ResetPwdVerifyMailCodeReq) {
    return ApiService.post<string, ResetPwdVerifyMailCodeReq>(
      "Member/resetpwdverifymailcode",
      req,
    );
  }

  static async register(req: RegisterAuthReq) {
    const reqString = encryptByAES(JSON.stringify(req));
    const response = await ApiService.post<string, RegisterReq>(
      "Member/register",
      {
        req_string: reqString,
      },
    );
    return response;
  }

  static async registerPhone(req: RegisterPhoneAuthReq) {
    const reqString = encryptByAES(JSON.stringify(req));
    const response = await ApiService.post<string, RegisterReq>(
      "Member/registerphone",
      {
        req_string: reqString,
      },
    );
    return response;
  }

  static async signIn1(req: SignIn1Req) {
    return ApiService.post<SignIn1Res, SignIn1Req>("Member/signin1", req);
  }

  static async signIn(req: SignInReq) {
    return ApiService.post<SignInRes, SignInReq>("Member/signin", req);
  }

  static async signOut(req: SignOutReq) {
    return ApiService.post<string, SignOutReq>("Member/signout", req);
  }

  static async verifyIdentity(req: VerifyIdentityReq) {
    return ApiService.post<string, VerifyIdentityReq>(
      "Member/verifyidentity",
      req,
    );
  }

  static async getTask(req: GetTaskReq) {
    return ApiService.post<GetTaskRes[], GetTaskReq>("Member/gettask", req);
  }

  static async passwordApply(req: ForgotPwdReq) {
    const reqString = encryptByAES(JSON.stringify(req));
    const response = await ApiService.post<string, PasswordApplyReq>(
      "Member/passwordapply",
      {
        req_string: reqString,
      },
    );
    return response;
  }

  static async passwordApplyPhone(req: ForgotPwdPhoneReq) {
    const reqString = encryptByAES(JSON.stringify(req));
    const response = await ApiService.post<string, PasswordApplyReq>(
      "Member/passwordapplyphone",
      {
        req_string: reqString,
      },
    );
    return response;
  }

  static async vertrfyCode() {
    return ApiService.get<undefined>("Member/vertrfycode");
  }

  static async getSetting(req: GetSettingReq) {
    return ApiService.post<GetSettingRes, GetSettingReq>(
      "Member/getsetting",
      req,
      {
        isRedirected: false,
      },
    );
  }

  static async sendSMSVerify(req: SendSMSVerifyReq) {
    return ApiService.post<string, SendSMSVerifyReq>(
      "Member/sendsmsverify",
      req,
    );
  }

  static async verifySMSCode(req: VerifySMSCodeReq) {
    return ApiService.post<string, VerifySMSCodeReq>(
      "Member/verifysmscode",
      req,
    );
  }

  static async checkPhoneAuth(req: CheckPhoneAuthReq) {
    return ApiService.post<string, CheckPhoneAuthReq>(
      "Member/checkphoneauth",
      req,
    );
  }

  static async sendPhoneVerify(req: SendPhoneVerifyReq) {
    return ApiService.post<string, SendPhoneVerifyReq>(
      "Member/sendphoneverify",
      req,
    );
  }

  static async isFinishAuth(req: IsFinishAuthReq) {
    return ApiService.post<string, IsFinishAuthReq>("Member/isfinishauth", req);
  }

  static async verifyPhoneCode(req: VerifyPhoneCodeReq) {
    return ApiService.post<string, VerifyPhoneCodeReq>(
      "Member/verifyphonecode",
      req,
    );
  }

  static async getNotify(req: GetNotifyReq) {
    return ApiService.post<GetNotifyRes, GetNotifyReq>("Member/getnotify", req);
  }

  static async setNotify(req: SetNotifyReq) {
    return ApiService.post<string, SetNotifyReq>("Member/setnotify", req);
  }

  static async setRichBoxAutoTransfer(req: SetRichBoxAutoTransferReq) {
    return ApiService.post<string, SetRichBoxAutoTransferReq>(
      "Member/setrichboxautotransfer",
      req,
    );
  }

  static async setStockChart(req: SetStockChartReq) {
    return ApiService.post<string, SetStockChartReq>(
      "Member/setstockchart",
      req,
    );
  }

  static async getInvitationInfo(req: GetInvitationInfoReq) {
    return ApiService.post<GetInvitationInfoRes, GetInvitationInfoReq>(
      "Member/getinvitationinfo",
      req,
    );
  }

  static async setPayPassword(req: SetPayPasswordReq) {
    return ApiService.post<string, SetPayPasswordReq>(
      "Member/setpaypassword",
      req,
    );
  }

  static async setMemberLang(req: SetMemberLangReq) {
    return ApiService.post<string, SetMemberLangReq>(
      "Member/setmemberlang",
      req,
    );
  }
}
