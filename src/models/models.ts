export interface subArticle {
    [key: string]: any;
    'name': string;
    'frequency': number;
    '2009': number | undefined;
    '2010': number | undefined;
    '2011': number | undefined;
    '2012': number | undefined;
    '2013': number | undefined;
    '2014': number | undefined;
  }


  export interface data extends Array<subArticle >  {
     
  }

  export interface anagramData {
    [key: string]: number[]
  }