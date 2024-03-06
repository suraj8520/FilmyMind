import { useRef } from 'react';
import Button from '../../ui-components/common/Button';
import toast from 'react-hot-toast';

function PublishForm({
  title,
  coverImage,
  category,
  selectCoverImage,
  selectCategory,
  onPublish,
  onCloseModal,
}) {
  const coverImgInputRef = useRef();
  function handleClickInput() {
    if (coverImgInputRef && coverImgInputRef.current) {
      coverImgInputRef.current?.click();
    }
  }

  function handleCoverImage(e) {
    const file = e.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      toast.error('Only image is supported');
      return;
    }
    selectCoverImage(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('publish');
    onPublish?.();
  }

  return (
    <form className="flex min-w-[20rem] flex-col gap-2" onSubmit={handleSubmit}>
      <h3 className="font-xl heading ">
        Publish: <span className="font-normal">{title}</span>
      </h3>
      <input
        type="file"
        className="w-full"
        hidden
        ref={coverImgInputRef}
        onChange={handleCoverImage}
      />
      <div
        className="h-fit w-full rounded-md bg-neutral-200 p-8 hover:cursor-pointer"
        onClick={handleClickInput}
      >
        <p className="text-center text-sm text-neutral-600">
          {coverImage ? coverImage.name : 'Click to select cover image'}
        </p>
      </div>

      <select
        id="category"
        name="category"
        className="rounded-md bg-neutral-200 p-2 text-neutral-700 outline-none"
        value={category}
        onChange={(e) => {
          if (e.target.value !== '') selectCategory(e.target.value);
        }}
      >
        <option value="">Select a category</option>
        <option value="movie">Movie</option>
        <option value="tv show">TV Show</option>
        <option value="comic">Comic</option>
        <option value="sports">Sports</option>
        <option value="anime">Anime</option>
        <option value="music">Music</option>
      </select>
      <div className="ml-auto mt-2 flex items-center gap-2">
        <Button
          variant="secondary"
          size="small"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button variant="primary" size="small">
          Publish
        </Button>
      </div>
    </form>
  );
}
export default PublishForm;
