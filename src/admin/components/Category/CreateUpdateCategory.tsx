import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	createCategory,
	updateCategory
} from '../../../features/Category/CategorySlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { InputChange } from '../../../utils/TypeScript';
import { checkCategory } from '../../../utils/Valid';

interface IProps {
	products: string | undefined;
	isActive: boolean;
	setClose: (value: boolean) => void;
}
interface ICate {
	name: string;
	role: number;
}
const CreateUpdateCategory: React.FC<IProps> = ({
	isActive,
	products,
	setClose
}) => {
	const [cate, setCate] = useState<ICate>({ name: '', role: 0 });
	const { name, role } = cate;
	const { category, auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const handleChangeInput = (e: InputChange) => {
		const { name, value } = e.target;
		setCate({ ...cate, [name]: value });
	};
	const data = products ? category.data?.find(p => p._id === products) : null;
	useEffect(() => {
		if (!products) return;
		if (!data) return;
		setCate({
			...cate,
			name: data.name,
			role: data.role
		});
	}, [data, products]);
	const handleOnClick = () => {
		const newData = {
			...cate,
			name,
			role
		};
		const data = checkCategory(newData);
		toast.error(data);
		if (!products && !data) {
			dispatch(
				createCategory({ ...newData, access_token: auth.data?.access_token })
			);
		} else {
			dispatch(
				updateCategory({
					...newData,
					access_token: auth.data?.access_token,
					productId: products
				})
			);
		}
		setCate({ name: '', role: 0 });
		setClose(true);
	};
	return (
		<div className="crateProduct" style={isActive ? { display: 'none' } : {}}>
			<div className="createProducts">
				<div className="close">
					<i className="fas fa-times" onClick={() => setClose(true)}></i>
				</div>
				<h3>Nhập tên category</h3>
				<TextField
					variant="outlined"
					label="name"
					InputLabelProps={{ style: { fontSize: 15 } }}
					inputProps={{ style: { fontSize: 15 } }}
					name="name"
					value={name}
					onChange={handleChangeInput}
					style={{ backgroundColor: '#fff', fontSize: '1.3rem', width: '90%' }}
				/>
				<h3>Chon loại</h3>
				<select onChange={handleChangeInput} name="role" value={role}>
					<option value="0">Chọn loại</option>
					<option value="1">Cây cảnh</option>
					<option value="2">Chậu cảnh</option>
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

export default CreateUpdateCategory;
