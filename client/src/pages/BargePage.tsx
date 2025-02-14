import Table from "../components/Table";

const BargePage: React.FC = () => {
    const headers = ["Barge ID", "Capacity (ton)"];
    const barges = [
        { bargeID: "b1", capacity: 3000 },
        { bargeID: "b2", capacity: 2500 },
        { bargeID: "b3", capacity: 2500 },
        { bargeID: "b4", capacity: 2500 },
        { bargeID: "b101", capacity: 2500 },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Barge Page</h1>
            <Table headers={headers} data={barges} />
        </div>
    );
};

export default BargePage;
