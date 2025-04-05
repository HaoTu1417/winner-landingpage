import { ApiService } from "./api.service";
import {
  AppLogoReq,
  AppLogoRes,
  AppThemeReq,
  AppThemeRes,
  ConfigReq,
  NameReq,
  NameRes,
  SignInReq,
  SignInRes,
} from "@/types/sys";

export class SysService {
  static async getTimeProtocol() {
    return ApiService.get<number>("Sys/timeprotocol?lang=US");
  }

  static async getName(req: NameReq) {
    return ApiService.post<NameRes, NameReq>("Sys/getname", req);
  }

  static async getConfig(req: ConfigReq) {
    return ApiService.post<string, ConfigReq>("Sys/config", req);
  }

  static async getAppLogo(req: AppLogoReq) {
    return ApiService.post<AppLogoRes, AppLogoReq>("Sys/applogo", req);
  }

  static async getAppTheme(req: AppThemeReq) {
    return ApiService.post<AppThemeRes, AppThemeReq>("Sys/apptheme", req);
  }

  static async signIn(req: SignInReq) {
    return ApiService.post<SignInRes, SignInReq>("Sys/signin", req);
  }
}
