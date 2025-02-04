export interface EtsyProduct {
  listing_id: number;
  title: string;
  description: string;
  price: {
    amount: number;
    divisor: number;
    currency_code: string;
  };
  quantity: number;
  taxonomy_id: number;
  shop_id: number;
  state: string;
  url: string;
  views: number;
  num_favorers: number;
  shipping_profile_id: number;
  processing_min: number;
  processing_max: number;
  who_made: string;
  when_made: string;
  images?: Array<{
    listing_id: number;
    listing_image_id: number;
    url_75x75: string;
    url_170x135: string;
    url_570xN: string;
    url_fullxfull: string;
  }>;
}

export interface EtsyListingsResponse {
  count: number;
  results: EtsyProduct[];
}
