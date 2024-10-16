export interface ProductProps {
  props: ProductContentProps;
  index: number;
  admobCount: number;
  handleGetRewardedAds?: () => void;
}

export interface ProductListContentProps {
  product: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  buttonAction: () => void;
}

export interface ProductContentProps {
  name?: string;
  title: string;
  productId: string;
  price?: string;
  localizedPrice?: string;
  discount?: string;
  originalPrice?: string;
  krwPrice?: string;
  buttonAction?: () => void;
}

export interface ProductContentContainerProps {
  index: number;
  admobCount: number;
}
