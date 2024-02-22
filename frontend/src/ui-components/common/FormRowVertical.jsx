function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
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
export default FormRowVertical;
