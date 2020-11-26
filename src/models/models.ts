export interface SubArticle {
  [key: string]: any;
  name: string;
  frequency: number;
  '2009': number | undefined;
  '2010': number | undefined;
  '2011': number | undefined;
  '2012': number | undefined;
  '2013': number | undefined;
  '2014': number | undefined;
}

export interface ArticleData extends Array<SubArticle> {}

export interface RawAnagramData {
  [key: string]: number[];
}

export interface InitState {
  allNumericData: ArticleData;
  quantity: number;
  orderDirection: string;
  orderType: string;
}
