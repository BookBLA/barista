export interface ProductProps {
  props: ProductContentProps;
  index: number;
  admobCount?: number;
}

export interface ProductListContentProps {
  product: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  buttonAction: () => void;
}

export interface ProductContentProps {
  title: string;
  productId: string;
  price?: string;
  localizedPrice?: string;
  discount?: string;
  originalPrice?: string;
  krwPrice?: string;
  buttonAction?: () => void;
}
