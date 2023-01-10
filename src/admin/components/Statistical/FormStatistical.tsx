import 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { getAPI } from '../../../Request';
interface IOrder {
	_id: string;
	count: number;
}
const FormStatistical: React.FC = () => {
	const [data, setData] = React.useState<IOrder[]>();
	React.useLayoutEffect(() => {
		const data = async () => {
			const res = await getAPI('getOrderUser');
			setData(res.data);
		};
		data();
	}, []);
	const chart = {
		labels: data?.map(item => item._id),
		datasets: [
			{
				label: 'Số lượng hàng đã bán (sản phẩm)',
				backgroundColor: [
					'#3e95cd',
					'#8e5ea2',
					'#3cba9f',
					'#e8c3b9',
					'#c45850'
				],
				data: data?.map(item => item.count)
			}
		]
	};
	return (
		<>
			<Bar data={chart} />
		</>
	);
};

export default FormStatistical;
