// import { useContext } from 'react';

// import OrderContext from '@/contexts/OrderContext';
// import LoadingPage from '@/pages/loading';

// export default function BargeManagementDashboard() {
// 	const { data, loading } = useContext(OrderContext);

// 	if (!data || loading) return <LoadingPage />;

// 	console.table(data);

// 	return (
// 		<table>
// 			<thead>header</thead>
// 			<tbody>
// 				{data.map((v, _idx) => (
// 					<tr key={v.id}>
// 						{Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((value, i) => (
// 							<td key={i}>
// 								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos hic dolorum qui voluptatum quasi
// 								cum et nam velit ducimus eos, similique expedita beatae pariatur dolor distinctio possimus temporibus
// 								reiciendis nihil.
// 							</td>
// 						))}
// 					</tr>
// 				))}
// 			</tbody>
// 		</table>
// 	);
// }

import { useState } from 'react';
// import { Search, ArrowDownToLine, Plus, Menu, X, Bell, ChevronDown } from 'lucide-react';

const BargeManagementDashboard = () => {
	// Sample data to simulate what would come from the OrderContext
	const [data, setData] = useState([
		{
			id: 'BG001',
			type: 'Import',
			from: 'Bangkok Port',
			dest: 'Warehouse A',
			product: 'Rice',
			demand: 500,
			startDateTime: '2025-05-05T08:00:00',
			DueDateTime: '2025-05-07T17:00:00',
			loadingRate: 50,
			craneRate1: 40,
			craneRate2: 35,
			craneRate3: 0,
			craneRate4: 45,
			craneRate5: 0,
			craneRate6: 0,
			craneRate7: 0,
			timeReadyCR1: '09:00',
			timeReadyCR2: '09:30',
			timeReadyCR3: '00:00',
			timeReadyCR4: '10:00',
			timeReadyCR5: '00:00',
			timeReadyCR6: '00:00',
			timeReadyCR7: '00:00',
		},
		{
			id: 'BG002',
			type: 'Export',
			from: 'Warehouse B',
			dest: 'Laem Chabang Port',
			product: 'Sugar',
			demand: 720,
			startDateTime: '2025-05-06T10:00:00',
			DueDateTime: '2025-05-08T16:00:00',
			loadingRate: 60,
			craneRate1: 50,
			craneRate2: 0,
			craneRate3: 55,
			craneRate4: 0,
			craneRate5: 48,
			craneRate6: 0,
			craneRate7: 0,
			timeReadyCR1: '10:30',
			timeReadyCR2: '00:00',
			timeReadyCR3: '11:00',
			timeReadyCR4: '00:00',
			timeReadyCR5: '11:30',
			timeReadyCR6: '00:00',
			timeReadyCR7: '00:00',
		},
		{
			id: 'BG003',
			type: 'Import',
			from: 'Khon Kaen Port',
			dest: 'Central Distribution',
			product: 'Cassava',
			demand: 350,
			startDateTime: '2025-05-07T07:30:00',
			DueDateTime: '2025-05-09T15:00:00',
			loadingRate: 40,
			craneRate1: 0,
			craneRate2: 35,
			craneRate3: 38,
			craneRate4: 0,
			craneRate5: 0,
			craneRate6: 42,
			craneRate7: 0,
			timeReadyCR1: '00:00',
			timeReadyCR2: '08:00',
			timeReadyCR3: '08:30',
			timeReadyCR4: '00:00',
			timeReadyCR5: '00:00',
			timeReadyCR6: '09:00',
			timeReadyCR7: '00:00',
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Filter data based on search input
	const filteredData = data.filter((val) => {
		return val.id.toLowerCase().includes(searchText.toLowerCase());
	});

	// Format date for display
	const formatDate = (dateString: string | number | Date) => {
		const date = new Date(dateString);
		return date.toLocaleString('th-TH', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	// Export dummy function
	const handleExport = () => {
		alert('Exporting data as CSV...');
	};

	const TABLE_HEAD = [
		'Id',
		'Type',
		'From',
		'Dest',
		'Product',
		'Demand',
		'Start Date Time',
		'Due Date Time',
		'Loading Rate',
		'CraneRate1',
		'CraneRate2',
		'CraneRate3',
		'CraneRate4',
		'CraneRate5',
		'CraneRate6',
		'CraneRate7',
		'TimeReadyCR1',
		'TimeReadyCR2',
		'TimeReadyCR3',
		'TimeReadyCR4',
		'TimeReadyCR5',
		'TimeReadyCR6',
		'TimeReadyCR7',
	];

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="hidden md:flex flex-col w-64 bg-white shadow">
				<div className="flex items-center justify-center h-16 border-b">
					<h1 className="text-xl font-bold text-blue-600">Barge Management</h1>
				</div>
				<div className="flex flex-col flex-1 overflow-y-auto">
					<nav className="flex-1 px-2 py-4 space-y-1">
						<a href="#" className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
							Dashboard
						</a>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
						>
							Orders
						</a>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
						>
							Barges
						</a>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
						>
							Schedules
						</a>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
						>
							Reports
						</a>
						<a
							href="#"
							className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
						>
							Settings
						</a>
					</nav>
				</div>
			</div>

			{/* Mobile menu */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 z-40 md:hidden">
					<div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMobileMenuOpen(false)}></div>
					<div className="relative flex flex-col w-full max-w-xs h-full bg-white">
						<div className="flex items-center justify-between h-16 px-4 border-b">
							<h1 className="text-xl font-bold text-blue-600">Barge Management</h1>
							<button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-600">
								{/* <X size={24} /> */}
							</button>
						</div>
						<div className="flex-1 px-2 py-4 overflow-y-auto">
							<nav className="flex flex-col space-y-1">
								<a
									href="#"
									className="flex items-center px-4 py-3 text-base font-medium text-white bg-blue-600 rounded-md"
								>
									Dashboard
								</a>
								<a
									href="#"
									className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
								>
									Orders
								</a>
								<a
									href="#"
									className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
								>
									Barges
								</a>
								<a
									href="#"
									className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
								>
									Schedules
								</a>
								<a
									href="#"
									className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
								>
									Reports
								</a>
								<a
									href="#"
									className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
								>
									Settings
								</a>
							</nav>
						</div>
					</div>
				</div>
			)}

			{/* Main content */}
			<div className="flex flex-col flex-1 overflow-hidden">
				{/* Top navigation */}
				<div className="flex items-center justify-between h-16 px-4 bg-white border-b shadow-sm">
					<button
						onClick={() => setIsMobileMenuOpen(true)}
						className="md:hidden text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
					>
						{/* <Menu size={24} /> */}
					</button>
					<div className="flex-1 flex justify-center md:justify-end">
						<div className="w-full flex items-center justify-end">
							<div className="flex items-center">
								<button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
									{/* <Bell size={20} /> */}
								</button>
								<div className="ml-4 flex items-center">
									<div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
										<span className="text-xs font-medium">TA</span>
									</div>
									<span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">Thai Admin</span>
									{/* <ChevronDown size={16} className="ml-1 text-gray-400" /> */}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Page content */}
				<div className="flex-1 overflow-auto p-4 md:p-6">
					<div className="bg-white rounded-lg shadow">
						{/* Table header */}
						<div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900">Barges Overview</h3>
							<div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-3 sm:space-y-0 sm:space-x-3 items-stretch sm:items-center">
								<button
									onClick={() => setIsModalOpen(true)}
									className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
								>
									{/* <Plus className="w-4 h-4 mr-2" /> ADD NEW */}
								</button>
								<button
									onClick={handleExport}
									className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
								>
									{/* <ArrowDownToLine className="w-4 h-4 mr-2" /> EXPORT */}
								</button>
								<div className="relative w-full sm:w-64">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										{/* <Search className="h-5 w-5 text-gray-400" /> */}
									</div>
									<input
										type="text"
										placeholder="Search"
										className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										value={searchText}
										onChange={(e) => setSearchText(e.target.value)}
									/>
								</div>
							</div>
						</div>

						{/* Table body */}
						<div className="overflow-x-auto">
							<div className="align-middle inline-block min-w-full">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												{TABLE_HEAD.map((head) => (
													<th
														key={head}
														scope="col"
														className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
													>
														{head}
													</th>
												))}
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200">
											{filteredData.map((order, idx) => {
												const rowData = [
													order.id,
													order.type,
													order.from,
													order.dest,
													order.product || 'ไม่ระบุ',
													order.demand,
													formatDate(order.startDateTime),
													formatDate(order.DueDateTime),
													order.loadingRate,
													order.craneRate1,
													order.craneRate2,
													order.craneRate3,
													order.craneRate4,
													order.craneRate5,
													order.craneRate6,
													order.craneRate7,
													order.timeReadyCR1,
													order.timeReadyCR2,
													order.timeReadyCR3,
													order.timeReadyCR4,
													order.timeReadyCR5,
													order.timeReadyCR6,
													order.timeReadyCR7,
												];

												return (
													<tr key={order.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
														{rowData.map((cell, cIdx) => (
															<td key={cIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
																{cIdx === 0 ? <span className="font-medium text-gray-900">{cell}</span> : cell}
															</td>
														))}
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Add New Order Modal */}
			{isModalOpen && (
				<div className="fixed z-50 inset-0 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>
						<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
										<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Barge Order</h3>
										<div className="mt-2 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">Order Type</label>
												<select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
													<option>Import</option>
													<option>Export</option>
												</select>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">ID</label>
												<input
													type="text"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">From</label>
												<input
													type="text"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">Destination</label>
												<input
													type="text"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">Product</label>
												<input
													type="text"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">Demand</label>
												<input
													type="number"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">Start Date Time</label>
												<input
													type="datetime-local"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
											<div className="sm:col-span-3">
												<label className="block text-sm font-medium text-gray-700">Due Date Time</label>
												<input
													type="datetime-local"
													className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Save
								</button>
								<button
									onClick={() => setIsModalOpen(false)}
									type="button"
									className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BargeManagementDashboard;
