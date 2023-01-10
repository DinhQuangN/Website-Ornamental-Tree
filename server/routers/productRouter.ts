import express from 'express';
import {
	createProduct,
	deleteProduct,
	getProduct,
	getProductByCategory,
	getProductDetail,
	getProducts,
	searchProduct,
	updateProduct
} from '../controllers/productController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/create_product', auth, createProduct);
router.get('/get_product', getProduct);
router.get('/get_products', getProducts);
router.patch('/update_product/:id', auth, updateProduct);
router.delete('/delete_product/:id', auth, deleteProduct);
router.get('/get_product/category/:categoryId', getProductByCategory);
router.get('/get_product/detail/:productId', getProductDetail);
router.get('/get_product_search', searchProduct);
export default router;
