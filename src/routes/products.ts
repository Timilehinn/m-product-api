import { Router } from 'express';
import { addProduct, deleteProduct, fetchAllProducts, fetchProduct, fetchProductsByPage, updateProduct } from '../controllers/products.controller';

const productRoute = () => {
  const router = Router();

  router.post('/add', addProduct);
  router.patch('/update/:code', updateProduct);
  router.delete('/delete/:code', deleteProduct);
  router.get('/fetch-all', fetchAllProducts);
  router.get('/fetch/:code', fetchProduct);
  router.get('/pagination/:page', fetchProductsByPage);

  return router;
};

export default productRoute;
