import React from 'react';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { getAPI, postAPI } from '../../../Request';
import { IUser } from '../../../utils/TypeScript';

const FormUser: React.FC = () => {
	const [user, setUser] = React.useState<IUser[]>();
	const { auth } = useAppSelector(state => state);
	const response = async () => {
		const res = await getAPI('get_user', auth.data?.access_token);
		setUser(res.data);
	};
	React.useEffect(() => {
		response();
	}, []);
	const handleRole = async (role: string, id: string) => {
		const data = role === 'admin' ? 'user' : 'admin';
		await postAPI(
			'update_role_user',
			{ role: data, id },
			auth.data?.access_token
		);
		// setUser({...user,user})
		const v = user?.map(item =>
			item._id === id ? { ...item, role: data } : item
		);
		setUser(v);
	};
	React.useLayoutEffect(() => {
		if (auth.data?.user?.role !== 'admin') window.location.href = '/';
	}, []);
	return (
		<div className="productAdmin">
			<div className="productAdminNav">
				{/* <button onClick={handleCreate}>Thêm loại sản phẩm</button> */}
				{/* <div className="productAdminSearch">
					<input
						type="text"
						placeholder="Search"
						name="searchAccessory"
						// onChange={(e: InputChange) => setSearchAcc(e.target.value)}
						// onKeyDown={handleKeyDown}
					/>
					<i className="fas fa-search" onClick={handleSearch}></i>
				</div> */}
			</div>
			<div className="productAdminTable">
				<div style={{ width: '100%' }}>
					<div className="productTable">
						<table>
							<thead>
								<tr>
									<th>ID</th>
									<th>Tên tài khoản</th>
									<th>Tài khoản</th>
									<th>Ảnh đại diện</th>
									<th>Loại tài khoản</th>
									<th>Ngày tạo tài khoản</th>
								</tr>
							</thead>
							<tbody>
								{user?.map((item: IUser, index: number) => (
									<tr key={index}>
										<td>{index}</td>
										<td>{item.name}</td>
										<td>{item.account}</td>
										<td>
											<img
												src={item.avatar}
												alt=""
												style={{ borderRadius: '50%' }}
											/>
										</td>
										<td>
											<button
												style={{
													border: 'none',
													backgroundColor: 'rgba(0,19,252,0.1)',
													padding: '10px 15px',
													boxShadow: '0 -2px -5px 1px rgba(0,0,0,0.2)',
													borderRadius: '5px',
													cursor: 'pointer',
													textTransform: 'capitalize'
												}}
												onClick={() => handleRole(item.role, item._id)}
											>
												{item.role}
											</button>
										</td>
										<td>
											{new Date(item.createdAt as string).toLocaleDateString()}
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
					{/* <CreateUpdateCategory
        products={currentId}
        isActive={open}
        setClose={setOpen}
      /> */}
				</div>
			</div>
		</div>
	);
};

export default FormUser;
