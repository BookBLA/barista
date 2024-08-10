export interface ProductProps {
  props: ProductListContentProps;
  index: number;
}

export interface ProductListContentProps {
  product: string;
  price?: string;
  originalPrice?: string;
  discount?: string;
  buttonAction: () => void;
}
