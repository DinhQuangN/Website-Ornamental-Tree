import { TextField } from '@mui/material';
import React from 'react';
import {
	createAccessory,
	updateAccessory
} from '../../../features/Accessory/AccessorySlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { imageUpload } from '../../../utils/ImageUpload';
import { IAccessory, IImage, InputChange } from '../../../utils/TypeScript';
import ReactQuill from '../Editor/ReactQuill';

interface IProps {
	products: string | undefined;
	isActive: boolean;
	setClose: (value: boolean) => void;
}

const CreateUpdateAccessory: React.FC<IProps> = ({
	products,
	isActive,
	setClose
}) => {
	const [image, setImage] = React.useState<IImage[]>([]);
	const [textDescribe, setTextDescribe] = React.useState<string>('');
	const [textDetail, setTextDetail] = React.useState<string>('');
	const { auth, accessory } = useAppSelector(state => state);
	const initialState = {
		title: '',
		describe: '',
		price: '',
		imageArray: image,
		detail: ''
	};
	const [product, setProduct] = React.useState<IAccessory>(initialState);
	const { title, price, imageArray } = product;
	const divRefDescribe = React.useRef(null);
	const divRefDetail = React.useRef(null);
	const dispatch = useAppDispatch();
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
	const data = products
		? accessory.data?.products.find(p => p._id === products)
		: null;
	React.useEffect(() => {
		if (!products) return;
		if (!data) return;
		setProduct({
			...product,
			title: data.title,
			price: String(data.price)
		});
		setImage(data.imageArray);
		setTextDescribe(data.describe);
		setTextDetail(data.detail);
	}, [data, products]);
	const handleOnClick = () => {
		let newData = {
			...product,
			describe: textDescribe,
			detail: textDetail,
			textDetail,
			imageArray: image
		};
		if (!auth.data?.access_token) return;
		if (!products) {
			dispatch(
				createAccessory({ ...newData, access_token: auth.data.access_token })
			);
		} else {
			dispatch(
				updateAccessory({
					...newData,
					access_token: auth.data.access_token,
					productId: products
				})
			);
		}

		setProduct(initialState);
		setTextDescribe('');
		setTextDetail('');
		setImage([]);
		setClose(true);
	};
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
				{/* <h3>Chon category</h3>
    <select onChange={handleChangeInput} name="categories">
      <option value="">Choose a category</option>
      {category.map((item, index) => (
        <option key={index} value={item._id}>
          {item.name}
        </option>
      ))}
    </select> */}
				<button onClick={handleOnClick}>Save</button>
			</div>
		</div>
	);
};

export default CreateUpdateAccessory;
