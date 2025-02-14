import Table from "../components/Table";

const OrderPage: React.FC = () => {
    const headers = ["Order ID", "Type", "From", "To", "น้ำหนัก", "Start Time", "Arrived Due Date"];
    const orders = [
        { orderID: "o1", type: "ขาวจีน", from: "carrier1", to: "customer1", weight: 10000, start: "12/1/2025", due: "15/1/2025" },
        { orderID: "o2", type: "ขาวจีน", from: "carrier1", to: "customer2", weight: 5000, start: "12/1/2025", due: "16/1/2025" },
        { orderID: "o3", type: "ขาวจีน", from: "carrier2", to: "customer3", weight: 10000, start: "12/1/2025", due: "16/1/2025" },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Order Page</h1>
            <Table headers={headers} data={orders} />
        </div>
    );
};

export default OrderPage;
