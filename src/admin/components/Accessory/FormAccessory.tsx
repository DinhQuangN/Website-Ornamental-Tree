import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import {
	deleteAccessory,
	getAccessory,
	searchAccessory
} from '../../../features/Accessory/AccessorySlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { InputChange, IProduct } from '../../../utils/TypeScript';
import CreateUpdateAccessory from './CreateUpdateAccessory';

const FormAccessory: React.FC = () => {
	const [open, setOpen] = useState<boolean>(true);
	const [currentId, setCurrentId] = useState<string>();
	const { accessory, auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const [searchAcc, setSearchAcc] = useState<string>('');
	const { search } = useLocation();
	const handleCreate = () => {
		setOpen(!open);
		setCurrentId(undefined);
	};
	useEffect(() => {
		dispatch(getAccessory(search));
	}, [dispatch, search]);
	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		dispatch(getAccessory(search));
	};
	const handleUpdate = (id: string | undefined) => {
		setOpen(false);
		setCurrentId(id);
	};
	const handleDelete = (id: string | undefined) => {
		if (
			window.confirm(
				'Bạn có chắc chắn muốn xóa sản phẩm phụ kiện này không'
			) === true
		) {
			dispatch(
				deleteAccessory({
					productId: id,
					access_token: auth.data?.access_token
				})
			);
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			dispatch(searchAccessory(searchAcc));
		}
	};
	const handleSearch = () => {
		dispatch(searchAccessory(searchAcc));
	};
	return (
		<div className="productAdmin">
			<div className="productAdminNav">
				<button onClick={handleCreate}>Thêm sản phẩm</button>
				<div className="productAdminSearch">
					<input
						type="text"
						placeholder="Search"
						name="searchAccessory"
						onChange={(e: InputChange) => setSearchAcc(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<i className="fas fa-search" onClick={handleSearch}></i>
				</div>
			</div>
			<div className="productAdminTable">
				<div style={{ width: '100%' }}>
					<div className="productTable">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Tên phụ kiện</th>
									<th>Giá phụ kiện</th>
									<th>Mô tả phụ kiện</th>
									<th>Ảnh phụ kiện</th>
									<th>Chi tiết phụ kiện</th>
								</tr>
							</thead>
							<tbody>
								{accessory.data?.products.map(
									(item: IProduct, index: number) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{item.title.slice(0, 25) + '...'}</td>
											<td>{item.price}</td>
											<td>{item.describe.slice(0.25) + '...'}</td>
											<td>
												<img
													src={item?.imageArray[0]?.image}
													alt={item.title}
												/>
											</td>
											<td>{item.detail.slice(0, 25) + '...'}</td>
											<td>
												<button onClick={() => handleUpdate(item._id)}>
													<i className="fas fa-pen-alt"></i>
												</button>
											</td>
											<td>
												<button onClick={() => handleDelete(item._id)}>
													<i className="fas fa-trash-alt"></i>
												</button>
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
					{accessory.data?.total && accessory.data.total > 1 ? (
						<Pagination
							totalPage={accessory.data.total}
							callback={handlePagination}
						/>
					) : null}
					<CreateUpdateAccessory
						products={currentId}
						isActive={open}
						setClose={setOpen}
					/>
				</div>
			</div>
		</div>
	);
};

export default FormAccessory;
