import axios from 'axios';
import { productsAPI } from '../util';

export const compare = {
  lowestprice: (a, b) => {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
  },
  highestprice: (a, b) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
  }
};

export const fetchProducts = async () => {
  try {
    const {
      data: { products }
    } = await axios.get(productsAPI);
    return products;
  } catch (error) {
    console.log('Could not fetch products. Try again later.');
  }
};
