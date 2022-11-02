import express from 'express';
import {
	createCategory,
	deleteCategory,
	getCategory,
	updateCategory
} from '../controllers/categoryController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/get_category', getCategory);
router.post('/create_category', auth, createCategory);
router.patch('/update_category/:id', auth, updateCategory);
router.delete('/delete_category/:id', auth, deleteCategory);

export default router;
