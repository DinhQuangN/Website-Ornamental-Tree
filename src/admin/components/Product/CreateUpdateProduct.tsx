import { TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createProduct } from '../../../features/Product/ProductSlice';
import { updateProducts } from '../../../features/Product/productsSlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { imageUpload } from '../../../utils/ImageUpload';
import {
	ICategory,
	IImage,
	InputChange,
	IProduct
} from '../../../utils/TypeScript';
import { checkProduct } from '../../../utils/Valid';
import ReactQuill from '../Editor/ReactQuill';

interface IProps {
	productId: string | undefined;
	isActive: boolean;
	setClose: (value: boolean) => void;
}
const CreateUpdateProduct: React.FC<IProps> = ({
	productId,
	isActive,
	setClose
}) => {
	const [image, setImage] = useState<IImage[]>([]);
	const [textDescribe, setTextDescribe] = useState<string>('');
	const [textDetail, setTextDetail] = useState<string>('');
	const { auth, category, products } = useAppSelector(state => state);
	const initialState = {
		_id: '',
		user: '',
		title: '',
		describe: '',
		price: '',
		imageArray: image,
		detail: '',
		category: ''
	};
	const [product, setProduct] = useState<IProduct>(initialState);
	const { title, price, imageArray } = product;
	const divRefDescribe = useRef(null);
	const divRefDetail = useRef(null);
	const dispatch = useAppDispatch();
	const data = productId
		? products.data?.products.find(p => p._id === productId)
		: null;
	useEffect(() => {
		if (!productId) return;
		if (!data) return;
		setProduct({
			...product,
			title: data.title,
			price: data.price,
			category: data.category
		});
		setImage(data.imageArray);
		setTextDescribe(data.describe);
		setTextDetail(data.detail);
	}, [data, productId]);
	const handleChangeImage = async (e: InputChange) => {
		const target = e.target as HTMLInputElement;
		const files = target.files;
		if (files) {
			const file = files[0];
			const photo = await imageUpload(file);
			setImage([...image, { image: photo.url }]);
		}
	};
	const handleChangeInput = (e: InputChange) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};
	const handleOnClick = () => {
		let newData = {
			...product,
			describe: textDescribe,
			detail: textDetail,
			imageArray: image
		};
		if (!auth.data?.access_token) return;
		const data = checkProduct(newData);
		toast.error(data);
		if (!productId && !data) {
			dispatch(
				createProduct({ ...newData, access_token: auth.data.access_token })
			);
		} else {
			dispatch(
				updateProducts({
					...newData,
					productId,
					access_token: auth.data.access_token
				})
			);
		}
		setProduct(initialState);
		setTextDescribe('');
		setTextDetail('');
		setImage([]);
		setClose(true);
	};
	// console.log(data?.category?.role);
	return (
		<div className="crateProduct" style={isActive ? { display: 'none' } : {}}>
			<div className="createProducts">
				<div className="close">
					<i className="fas fa-times" onClick={() => setClose(true)}></i>
				</div>
				<h3>Nhập tên sản phẩm</h3>
				<TextField
					variant="outlined"
					label="title"
					InputLabelProps={{ style: { fontSize: 15 } }}
					inputProps={{ style: { fontSize: 15 } }}
					name="title"
					value={title}
					onChange={handleChangeInput}
					style={{ backgroundColor: '#fff', fontSize: '1.3rem', width: '90%' }}
				/>
				<h3>Nhập describe</h3>
				<ReactQuill body={textDescribe} setBody={setTextDescribe} />
				<div
					ref={divRefDescribe}
					dangerouslySetInnerHTML={{ __html: textDescribe }}
					style={{ display: 'none' }}
				/>
				<h3>Nhập price</h3>
				<TextField
					variant="outlined"
					label="price"
					InputLabelProps={{ style: { fontSize: 15 } }}
					inputProps={{ style: { fontSize: 15 } }}
					name="price"
					value={price}
					onChange={handleChangeInput}
					style={{ backgroundColor: '#fff', fontSize: '1.3rem', width: '90%' }}
				/>
				<div className="showImageFile"></div>
				<h3>Chọn tầm 4 ảnh</h3>
				<div style={{ height: '60px', marginBottom: '15px' }}>
					{image
						? image?.map((item, index) => (
								<img
									style={{
										width: '60px',
										borderRadius: '5px',
										marginRight: '15px'
									}}
									key={index}
									src={item.image}
									alt=""
								/>
						  ))
						: imageArray?.map((item, index) => (
								<img
									style={{
										width: '60px',
										borderRadius: '5px',
										marginRight: '15px'
									}}
									key={index}
									src={item.image}
									alt=""
								/>
						  ))}
				</div>
				<input
					type="file"
					name=""
					accept="image/*"
					className="InputFile"
					onChange={handleChangeImage}
				/>
				<h3>Nhập detail</h3>
				<ReactQuill body={textDetail} setBody={setTextDetail} />
				<div
					ref={divRefDetail}
					dangerouslySetInnerHTML={{ __html: textDetail }}
					style={{ display: 'none' }}
				/>
				<h3>Chon category</h3>
				<select onChange={handleChangeInput} name="category">
					<option value="">Choose a category</option>
					{category.data?.map((item: ICategory, index: number) => (
						<option key={index} value={item._id}>
							{item.name}
						</option>
					))}
				</select>
				<button
					style={{
						color: '#000',
						border: '1px solid #000',
						backgroundColor: 'transparent',
						fontWeight: '500',
						marginLeft: '15px'
					}}
					onClick={() => setClose(true)}
				>
					Cancel
				</button>
				<button onClick={handleOnClick}>Save</button>
			</div>
		</div>
	);
};

export default CreateUpdateProduct;
