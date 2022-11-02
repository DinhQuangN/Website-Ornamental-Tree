import express from 'express';
import {
	createAccessory,
	deleteAccessory,
	getAccessory,
	getAccessoryDetail,
	searchAccessory,
	updateAccessory
} from '../controllers/accessoryController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/create_accessory', auth, createAccessory);
router.get('/accessory/detail/:productId', getAccessoryDetail);
router.get('/accessory', getAccessory);
router.patch('/update_accessory/:id', auth, updateAccessory);
router.delete('/delete_accessory/:id', auth, deleteAccessory);
router.get('/search_accessory', searchAccessory);
export default router;
