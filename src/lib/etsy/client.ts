import { EtsyListingsResponse } from "./types";

const ETSY_KEYSTRING = process.env.ETSY_KEYSTRING!;
const ETSY_SHARED_SECRET = process.env.ETSY_SHARED_SECRET!;
const BASE_URL = "https://openapi.etsy.com/v3";

interface FetchProductsOptions {
  limit?: number;
  offset?: number;
  keywords?: string;
  taxonomy_id?: number;
  shop_id?: string;
}

async function getAccessToken() {
  try {
    const response = await fetch("https://api.etsy.com/v3/public/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: ETSY_KEYSTRING,
        client_secret: ETSY_SHARED_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

export async function fetchProducts({
  limit = 25,
  offset = 0,
  keywords,
  taxonomy_id,
  shop_id,
}: FetchProductsOptions = {}) {
  try {
    const accessToken = await getAccessToken();

    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
    });

    if (keywords) {
      params.append("keywords", keywords);
    }
    if (taxonomy_id) {
      params.append("taxonomy_id", taxonomy_id.toString());
    }

    const endpoint = shop_id
      ? `${BASE_URL}/application/shops/${shop_id}/listings/active`
      : `${BASE_URL}/application/listings/active`;

    const url = `${endpoint}?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "x-api-key": ETSY_KEYSTRING,
      },
    });

    if (!response.ok) {
      throw new Error(`Etsy API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data as EtsyListingsResponse;
  } catch (error) {
    console.error("Error fetching from Etsy API:", error);
    throw error;
  }
}

export async function fetchProductImages(listingId: number) {
  try {
    const accessToken = await getAccessToken();
    const url = `${BASE_URL}/application/listings/${listingId}/images`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "x-api-key": ETSY_KEYSTRING,
      },
    });

    if (!response.ok) {
      throw new Error(`Etsy API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching product images:", error);
    throw error;
  }
}
