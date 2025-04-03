import {
  adReq,
  adRes,
  advertiseReq,
  answerReq,
  bulletinContentReq,
  bulletinReq,
  contentPromotionsReq,
  contentPromotionsRes,
  docByCidReq,
  docByCidRes,
  docReq,
  exchangeRateReq,
  exchangeRateRes,
  exchangeReq,
  listPromotionsReq,
  listPromotionsRes,
  questionCatalogReq,
  questionListReq,
  serviceAnswerReq,
  serviceQuestionReq,
  serviceReq,
  serviceRes,
} from "@/types/info";
import { ApiService } from "./api.service";

const PREFIX = "Info";

export class InfoService {
  static async getListPromotions(req: listPromotionsReq) {
    return ApiService.post<listPromotionsRes[], listPromotionsReq>(
      `${PREFIX}/promotionlist`,
      req,
    );
  }

  static async getContentListPromotions(req: contentPromotionsReq) {
    return ApiService.post<contentPromotionsRes, contentPromotionsReq>(
      `${PREFIX}/promotioncontent`,
      req,
    );
  }

  static async getFAQcategories(req: questionCatalogReq) {
    return ApiService.post(`${PREFIX}/questioncatalog`, req);
  }

  static async getQuestionList(req: questionListReq) {
    return ApiService.post(`${PREFIX}/questionlist`, req);
  }

  static async getAnswer(req: answerReq) {
    return ApiService.post(`${PREFIX}/answer`, req);
  }

  static async getDetailExchangeRate(req: exchangeRateReq) {
    return ApiService.post<exchangeRateRes, exchangeRateReq>(
      `${PREFIX}/exchangerate`,
      req,
    );
  }

  static async getAllExchangeRate(req: exchangeReq) {
    return ApiService.post(`${PREFIX}/exchange`, req);
  }

  static async getListAnnouncements(req: bulletinReq) {
    return ApiService.post(`${PREFIX}/bulletin`, req);
  }

  static async getContentAnnouncements(req: bulletinContentReq) {
    return ApiService.post(`${PREFIX}/bulletincontent`, req);
  }

  static async getArticleContentById(req: docReq) {
    return ApiService.post(`${PREFIX}/doc`, req);
  }

  static async getArticleContentByCid(req: docByCidReq) {
    return ApiService.post<docByCidRes, docByCidReq>(`${PREFIX}/docbycid`, req);
  }

  static async getCustomerServiceInfo(req: serviceReq) {
    return ApiService.post<serviceRes, serviceReq>(`${PREFIX}/service`, req);
  }

  static async getCustomerServiceQuestion(req: serviceQuestionReq) {
    return ApiService.post(`${PREFIX}/servicequestion`, req);
  }

  static async getCustomerServiceAnswer(req: serviceAnswerReq) {
    return ApiService.post(`${PREFIX}/serviceanswer`, req);
  }

  static async getHomeAdvertisements(req: adReq) {
    return ApiService.post<adRes, adReq>(`${PREFIX}/ad`, req);
  }

  static async getAdvertisements(req: advertiseReq) {
    return ApiService.post(`${PREFIX}/advertise`, req);
  }
}
