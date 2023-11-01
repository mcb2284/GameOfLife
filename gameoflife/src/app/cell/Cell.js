export default function Cell({ living, onClick }) {
  const alive = living ? `bg-gray-800` : `bg-gray-50`;

  return (
    <div
      className={`w-6 h-6 border border-gray-900 ${alive}`}
      onClick={() => {
        onClick();
      }}
    />
  );
}
