export default function FilterBtn({ text, active }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium
      ${active ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}
    >
      {text}
    </button>
  );
}