function FormRow({ direction = 'vertical', label, error, children }) {
  return (
    <div className={`flex gap-1 ${direction === 'vertical' && 'flex-col'}`}>
      {label && (
        <label
          htmlFor={children.props.id}
          className="pl-2 font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
export default FormRow;
