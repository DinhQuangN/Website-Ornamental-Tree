import React from 'react';
import { useLocation } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import {
	deleteProducts,
	getProducts
} from '../../../features/Product/productsSlice';
import {
	useAppDispatch,
	useAppSelector
} from '../../../hooks/useTypedSelector';
import { IProduct } from '../../../utils/TypeScript';
import { vnd } from '../../../utils/Valid';
import CreateUpdateProduct from './CreateUpdateProduct';

const FormProduct: React.FC = () => {
	const [open, setOpen] = React.useState<boolean>(true);
	const [currentId, setCurrentId] = React.useState<string>();
	const { auth, products } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	const { search } = useLocation();
	React.useEffect(() => {
		dispatch(getProducts(search));
	}, [dispatch, search]);
	const handleCreate = () => {
		setOpen(false);
		setCurrentId(undefined);
	};
	const handlePagination = (num: number) => {
		const search = `?page=${num}`;
		dispatch(getProducts(search));
	};
	const handleUpdate = (id: string) => {
		setCurrentId(id);
		setOpen(false);
	};
	const handleDelete = (id: string) => {
		if (
			window.confirm(
				'Bạn có chắc chắn muốn xóa sản phẩm phụ kiện này không'
			) === true
		) {
			dispatch(
				deleteProducts({
					productId: id,
					access_token: auth.data?.access_token
				})
			);
		}
	};
	const handleSearch = () => {};
	return (
		<div className="productAdmin">
			<div className="productAdminNav">
				<button onClick={handleCreate}>Thêm sản phẩm</button>
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
									<th>Tên sản phẩm</th>
									<th>Giá sản phẩm</th>
									<th>Mô tả sản phẩm</th>
									<th>Ảnh sản phẩm</th>
									<th>Chi tiết sản phẩm</th>
									{/* <th>Loại sản phẩm</th> */}
								</tr>
							</thead>
							<tbody>
								{products.data?.products.map(
									(item: IProduct, index: number) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{item.title.slice(0, 25) + '...'}</td>
											<td>{vnd(item.price)}</td>
											<td>{item.describe.slice(0, 25) + '...'}</td>
											<td>
												<img src={item.imageArray[0].image} alt={item.title} />
											</td>
											<td>{item.detail.slice(0, 25) + '...'}</td>
											{/* <td>{item.category.name}</td> */}
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
					{products.data?.total && products.data.total > 1 ? (
						<Pagination
							totalPage={products.data.total}
							callback={handlePagination}
						/>
					) : null}
					<CreateUpdateProduct
						productId={currentId}
						isActive={open}
						setClose={setOpen}
					/>
				</div>
			</div>
		</div>
	);
};

export default FormProduct;
