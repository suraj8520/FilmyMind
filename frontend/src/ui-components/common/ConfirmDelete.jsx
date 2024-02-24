import Button from './Button';

function ConfirmDelete({ resource, onDelete, onCloseModal }) {
  return (
    <div className="flex flex-col">
      <h3 className="heading mb-2 text-xl">Delete {resource}</h3>
      <p className="mb-6 text-neutral-800">
        Are you sure you want to delete {resource}?
      </p>
      <div className="ml-auto flex gap-2">
        <Button
          size="small"
          variant="secondary"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="danger"
          onClick={() => {
            onDelete?.();
            onCloseModal?.();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
export default ConfirmDelete;
