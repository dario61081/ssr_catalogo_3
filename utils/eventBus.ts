import mitt from 'mitt';

type Events = {
  'filter:change': { categoryId?: number; subcategoryId?: number; };
  'sort:change': { sortBy: string };
  'product:view': { productId: number };
  'product:addToCart': { product: any; quantity: number };
  'product:addToFavorites': { productId: number };
  'product:removeFromFavorites': { productId: number };
  'cart:update': undefined;
  'favorites:update': undefined;
};

const emitter = mitt<Events>();

export default emitter;
