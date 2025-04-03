// Info/promotionlist
export interface listPromotionsReq {
  time_stamp: number;
  lang: string;
}

export interface listPromotionsRes {
  pk: number;
  title: string;
  outsite: boolean;
  img_url: string;
  url: string;
  activity_name: string;
  show_activity_time: boolean;
  starttime: string;
  endtime: string;
}

// Info/promotioncontent
export interface contentPromotionsReq {
  pk: number;
  lang: string;
}

export interface contentPromotionsRes {
  pk: number;
  title: string;
  topic_content: string;
  activity_name: string;
  show_activity_time: boolean;
  starttime: string;
  endtime: string;
}

// Info/questioncatalog
export interface questionCatalogReq {
  time_stamp: number;
  lang: string;
}

export interface questionCatalogRes {
  pk: number;
  label: string;
  icon: string;
}

// Info/questionlist
export interface questionListReq {
  lang: string;
  catalog_pk: number;
}

export interface questionListRes {
  pk: number;
  question: string;
}

// Info/answer
export interface answerReq {
  lang: string;
  catalog_pk: number;
  question_pk: number;
}

export interface answerRes {
  question: string;
  answer: string;
}

// Info/exchangerate
export interface exchangeRateReq {
  base_currency: string;
  target_currency: string;
  lang: string;
}

export interface exchangeRateRes {
  exchange: string;
  exchange_rate: number;
}

// Info/exchange
export interface exchangeReq {
  time_stamp: number;
  lang: string;
}

export interface exchangeRes {
  base_currency: string;
  quote_currency: string;
  base_currency_flag: string;
  quote_currency_flag: string;
  exchange_rate: number;
}

// Info/bulletin
export interface bulletinReq {
  time_stamp: number;
  lang: string;
}

export interface bulletinRes {
  pk: number;
  doc_fk: number;
  title: string;
  summary: string;
  live: number;
  trash: number;
  date: string; // ISO 8601 format
}

// Info/bulletincontent
export interface bulletinContentReq {
  pk: number;
  lang: string;
}

export interface bulletinContentRes {
  pk: number;
  title: string;
  summary: string;
  topic_content: string;
}

// Info/doc
export interface docReq {
  lang: string;
  id: number;
}

export interface docRes {
  title: string;
  content: string;
  view: number;
  trash: number;
  status: number;
}

// Info/docbycid
export interface docByCidReq {
  lang: string;
  cid: string;
}

export interface docByCidRes {
  title: string;
  content: string;
  view: number;
  trash: number;
  status: number;
}

// Info/service
export interface serviceReq {
  time_stamp: number;
  lang: string;
}

export interface serviceRes {
  lang: string;
  svc_phone: string;
  svc_workday: string;
  svc_nonworkday: string;
  svc_link: string;
  svc_email: string;
}

// Info/servicequestion
export interface serviceQuestionReq {
  lang: string;
  catalog_pk: number;
}

export interface serviceQuestionRes {
  pk: number;
  question: string;
  answer: string;
}

// Info/serviceanswer
export interface serviceAnswerReq {
  lang: string;
  question_pk: number;
}

export interface serviceAnswerRes {
  answer: string;
}

// Info/ad
export interface adReq {
  time_stamp: number;
  lang: string;
}

export interface adRes {
  bnr: {
    cms_files_fk: number;
    enable: boolean;
    sort: number;
    url: string;
    size: number;
    lang: string;
  }[];
  marq: string[];
  pop_msg: string;
  show_pop: false;
}

export interface adBannerItem {
  cms_files_fk: number;
  enable: boolean;
  sort: number;
  url: string;
  size: string;
  lang: string;
}

// Info/advertise
export interface advertiseReq {
  time_stamp: number;
  lang: string;
}

export interface advertiseRes {
  cms_files_fk: number;
  enable: boolean;
  sort: number;
  url: string;
  hyperlink: string;
  size: string;
  lang: string;
}
