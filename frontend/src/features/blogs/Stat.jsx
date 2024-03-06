function Stat({ number, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-4xl font-medium text-neutral-800">{number}</p>
      <p className="text-neutral-700">{label}</p>
    </div>
  );
}
export default Stat;
