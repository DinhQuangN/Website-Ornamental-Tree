import { Box, CircularProgress } from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { createSlider, updateSlider } from '../../../features/Slide/SlideSlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { imageUpload } from '../../../utils/ImageUpload';
import { InputChange } from '../../../utils/TypeScript';

interface IProps {
	products: string | undefined;
	isActive: boolean;
	setClose: (value: boolean) => void;
}
const CreateUpdateSlider: React.FC<IProps> = ({
	isActive,
	products,
	setClose
}) => {
	const [image, setImage] = useState<string>();
	const { auth, slide } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const slider = products ? slide.data?.find(p => p._id === products) : null;
	useLayoutEffect(() => {
		if (!slider) return;
		setImage(slider.image);
	}, [slider]);
	const handleChangeImage = async (e: InputChange) => {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (files) {
			const file = files[0];
			const photo = await imageUpload(file);
			setImage(photo.url);
		}
	};
	const handleOnClick = () => {
		if (!image) return;
		if (!products) {
			dispatch(
				createSlider({ image: image, access_token: auth.data?.access_token })
			);
		} else {
			dispatch(
				updateSlider({
					image: image,
					productId: products,
					access_token: auth.data?.access_token
				})
			);
		}
		setImage('');
	};
	return (
		<div className="crateProduct" style={isActive ? { display: 'none' } : {}}>
			<div className="createProducts">
				<div className="close">
					<i className="fas fa-times" onClick={() => setClose(true)}></i>
				</div>
				<h3>Chọn ảnh làm slider</h3>
				<div
					style={{
						width: '500px',
						border: 'none',
						borderRadius: '5px',
						overflow: 'hidden',
						boxShadow: '0 0 15px 0 rgba(0 ,0,0,0.2)',
						marginBottom: '15px'
					}}
				>
					{!image ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						<img
							style={{ height: '240px', overflow: 'hidden', marginTop: '10px' }}
							src={image}
							alt=""
						/>
					)}
				</div>
				<input
					type="file"
					name=""
					accept="image/*"
					className="InputFile"
					onChange={handleChangeImage}
				/>
				<button onClick={handleOnClick}>Save</button>
			</div>
		</div>
	);
};

export default CreateUpdateSlider;
