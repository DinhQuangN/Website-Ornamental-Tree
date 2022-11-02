import { Stack } from '@mui/material';
import Paginations from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
interface IProps {
	totalPage: number | undefined;
	callback: any;
}
const Pagination: React.FC<IProps> = ({ totalPage, callback }) => {
	const [page, setPage] = useState<number>(1);
	const history = useNavigate();
	const handlePagination = (e: any, value: number) => {
		history(`?page=${value}`);
		callback(value);
	};
	const { search } = useLocation();
	useEffect(() => {
		setPage(Number(search.slice(6)));
	}, [search]);
	return (
		<Stack spacing={2}>
			<Paginations
				count={totalPage}
				color="secondary"
				size="medium"
				defaultPage={page}
				onChange={handlePagination}
			/>
		</Stack>
	);
};

export default Pagination;
