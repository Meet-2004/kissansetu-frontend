export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl flex justify-between items-center shadow-sm">
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        📦
      </div>
    </div>
  );
}