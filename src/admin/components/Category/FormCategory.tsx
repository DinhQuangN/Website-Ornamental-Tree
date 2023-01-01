import React from 'react';
import { deleteCategory } from '../../../features/Category/CategorySlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { ICategory } from '../../../utils/TypeScript';
import CreateUpdateCategory from './CreateUpdateCategory';

const FormCategory: React.FC = () => {
	const [open, setOpen] = React.useState<boolean>(true);
	const [currentId, setCurrentId] = React.useState<string>();
	const { category, auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const handleCreate = () => {
		setCurrentId(undefined);
		setOpen(false);
	};
	const handleUpdate = (id: string | undefined) => {
		setOpen(false);
		setCurrentId(id);
	};
	const handleDelete = (id: string | undefined) => {
		if (
			window.confirm('Bạn có chắc chắn muốn xóa loại sản phẩm này không') ===
			true
		) {
			dispatch(
				deleteCategory({ productId: id, access_token: auth.data?.access_token })
			);
			window.location.href = '/admin/loai-san-pham';
		}
	};
	const handleSearch = () => {};
	return (
		<div className="productAdmin">
			<div className="productAdminNav">
				<button onClick={handleCreate}>Thêm loại sản phẩm</button>
				<div className="productAdminSearch">
					<input
						type="text"
						placeholder="Search"
						name="searchAccessory"
						// onChange={(e: InputChange) => setSearchAcc(e.target.value)}
						// onKeyDown={handleKeyDown}
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
									<th>Tên loại sản phẩm</th>
									<th>Loại sản phẩm</th>
								</tr>
							</thead>
							<tbody>
								{category.data?.map((item: ICategory, index: number) => (
									<tr key={index}>
										<td>{index}</td>
										<td>{item.name}</td>
										<td>{item.role === 1 ? 'Cây cảnh' : 'Chậu cảnh'}</td>
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
								))}
							</tbody>
						</table>
					</div>
					{/* {accessory.data?.total && accessory.data.total > 1 ? (
						<Pagination
							totalPage={accessory.data.total}
							callback={handlePagination}
						/>
					) : null} */}
					<CreateUpdateCategory
						products={currentId}
						isActive={open}
						setClose={setOpen}
					/>
				</div>
			</div>
		</div>
	);
};

export default FormCategory;
