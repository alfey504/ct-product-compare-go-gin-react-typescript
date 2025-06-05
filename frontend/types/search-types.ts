export type SearchResponse = {
    products: Product[];
    pagination: Pagination;
  };
  
  export type Product = {
    url: string;
    code: string;
    title: string;
    images: Image[];
    brand: Brand;
    rating: number;
    ratingsCount: number;
    featureBullets: FeatureBullet[];
    skuId: string;
    currentPrice: Price;
    partNumber: string;
    badges: string[];
    isMultiSku: boolean;
    extraInfo: ExtraInfo[];
    isOnSale: boolean;
    originalPrice: Price;
    totalCurrentPrice: Price;
    totalOriginalPrice: Price;
    feeValues: { [key: string]: number };
    sellable: boolean;
    orderable: boolean;
    fulfillment: Fulfillment;
    warrantyMessage: string;
  };
  
  export type Image = {
    altText: string;
    url: string;
  };
  
  export type Brand = {
    label: string;
    url: any; // Could be more specific if you know the type
  };
  
  export type FeatureBullet = {
    description: string;
  };
  
  export type Price = {
    value: number;
    maxPrice: any; // Could be number | null if that's the case
    minPrice: any; // Could be number | null if that's the case
  };
  
  export type ExtraInfo = {
    skuId: string;
    skuNumber: string;
    partNumbers: string;
  };
  
  export type Fulfillment = {
    availability: Availability;
  };
  
  export type Availability = {
    quantity: number;
    storeShelfLocation: any; // Could be string | null if that's the case
    altLocations: any; // Could be an array of a specific type or null
  };
  
  export type Pagination = {
    total: number;
  };
  