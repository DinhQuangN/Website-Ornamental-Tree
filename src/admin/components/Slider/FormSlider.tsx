import React, { useState } from 'react';
import { deleteSlider } from '../../../features/Slide/SlideSlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { ISlide } from '../../../utils/TypeScript';
import CreateUpdateSlider from './CreateUpdateSlider';

const FormSlider: React.FC = () => {
	const [open, setOpen] = useState<boolean>(true);
	const [currentId, setCurrentId] = useState<string>();
	const { slide, auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const handleCreate = () => {
		setOpen(!open);
		setCurrentId(undefined);
	};
	const handleUpdate = (id: string | undefined) => {
		setCurrentId(id);
		setOpen(!open);
	};
	const handleDelete = (id: string | undefined) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa slider này không') === true) {
			dispatch(
				deleteSlider({ productId: id, access_token: auth.data?.access_token })
			);
		}
	};
	return (
		<div className="productAdmin">
			<div className="productAdminNav">
				<button onClick={handleCreate}>Thêm sản phẩm</button>
				<div className="productAdminSearch">
					<input type="text" placeholder="Search" />
					<i className="fas fa-search"></i>
				</div>
			</div>
			<div className="productAdminTable">
				<div style={{ width: '100%' }}>
					<div className="productTable">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Image</th>
								</tr>
							</thead>
							<tbody>
								{slide.data?.map((item: ISlide, index: number) => (
									<tr key={index}>
										<td style={{ width: '10%' }}>{index}</td>
										<td
											style={{
												width: '60px',
												height: '60px',
												borderRadius: '5px',
												overflow: 'hidden'
											}}
										>
											<img src={item.image} alt="" />
										</td>
										<td style={{ width: '10%' }}>
											<button onClick={() => handleUpdate(item._id)}>
												<i className="fas fa-pen-alt"></i>
											</button>
										</td>
										<td style={{ width: '10%' }}>
											<button onClick={() => handleDelete(item._id)}>
												<i className="fas fa-trash-alt"></i>
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<CreateUpdateSlider
						products={currentId}
						isActive={open}
						setClose={setOpen}
					/>
				</div>
			</div>
		</div>
	);
};
export default FormSlider;
