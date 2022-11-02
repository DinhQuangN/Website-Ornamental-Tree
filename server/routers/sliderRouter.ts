import express from 'express';
import {
	createSlider,
	deleteSlider,
	getSlider,
	updateSlider
} from '../controllers/sliderController';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/create_slider', auth, createSlider);
router.get('/get_slider', getSlider);
router.patch('/update_slider/:id', auth, updateSlider);
router.delete('/delete_slider/:id', auth, deleteSlider);

export default router;
