import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import '@blocknote/react/style.css';
import useThemeContext from '../../contexts/useThemeContext';
import {
  createDraft,
  getImageUrl,
  saveDraft,
  publishBlog as publishBlogApi,
  getDraft,
} from '../../services/api/blog';
import { FaChevronLeft } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import Button from '../../ui-components/common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../ui-components/compound-components/Modal';
import ConfirmDelete from '../../ui-components/common/ConfirmDelete';
import Logo from '../../ui-components/common/Logo';
import useAutoResizeTextArea from './useAutoResizeTextArea';
import PublishForm from './PublishForm';
import useDeleteBlog from './useDeleteBlog';
import Loader from '../../ui-components/common/Loader';

async function blogProcessing(draft) {
  let data;
  if (!draft.id) {
    data = await createDraft({
      title: draft.title,
      description: draft.description,
      content: draft.content,
    });
  } else {
    data = await saveDraft(draft);
  }
  return data;
}

async function uploadImage(file) {
  if (file.type.split('/')[0] !== 'image') {
    toast.error('Only image is supported');
    return;
  }
  const formData = new FormData();
  formData.append('contentImage', file);
  try {
    const { imgUrl } = await getImageUrl(formData);
    return imgUrl;
  } catch (err) {
    toast.error(err.message);
  }
}

function BlogEditor() {
  const headingRef = useAutoResizeTextArea();
  const descriptionRef = useAutoResizeTextArea();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const [draftId, setDraftId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState('');
  const [refreshed, setRefreshed] = useState(false);
  const { isDarkMode } = useThemeContext();

  const { isLoading, data, status } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => getDraft(blogId),
  });

  const { mutate: processBlog } = useMutation({
    mutationFn: blogProcessing,
    onSuccess: (data) => {
      if (!draftId) {
        setDraftId(data.blog._id);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: publishBlog } = useMutation({
    mutationFn: ({ id, blogData }) => publishBlogApi(id, blogData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { deletionStatus, deleteBlog } = useDeleteBlog();

  const editor = useBlockNote(
    {
      editable: true,
      initialContent: content,
      defaultStyles: true,
      onEditorContentChange: (editor) => {
        if (editor.topLevelBlocks.length != content.length)
          setContent(editor.topLevelBlocks);
      },
      uploadFile: uploadImage,
    },
    [deletionStatus, refreshed],
  );

  function handlePublishBlog() {
    if (!category || !title || !coverImage || !description || !content.length) {
      let message = `${!category ? 'Category ' : ''}${!title ? 'Title ' : ''}${!coverImage ? 'Cover Image ' : ''}${!description ? 'Description ' : ''}${!content.length ? 'Content' : ''}`;
      message = message.split(' ').join(', ');
      message += 'can not be empty!';
      toast.error(message);
      return;
    }

    const blogData = new FormData();
    blogData.append('coverImage', coverImage);
    blogData.append('title', title);
    blogData.append('description', description);
    blogData.append('content', content);
    blogData.append('category', category);
    publishBlog(
      { id: draftId, blogData },
      {
        onSuccess: () => {
          navigate('/blog/' + draftId, { replace: true });
        },
      },
    );
  }

  function reset() {
    setTitle('');
    setDraftId('');
    setDescription('');
    setContent([]);
    setCoverImage(null);
    setCategory('');
  }

  useEffect(() => {
    if (blogId && status === 'success') {
      setDraftId(blogId);
      const { blog } = data;
      setTitle(blog.title);
      setDescription(blog.description);
      setContent(JSON.parse(blog.content));
      setRefreshed(true);
    }
  }, [status, blogId, data]);

  // not using customHook will work as well.
  useEffect(() => {
    // After setting the title from the backend data, trigger resize for the headingRef textarea
    if (blogId && title && headingRef.current) {
      headingRef.current.style.height = 'auto'; // Reset height to auto
      headingRef.current.style.height = `${headingRef.current.scrollHeight}px`; // Set height to the scroll height
    }
  }, [title, headingRef, blogId]);

  useEffect(() => {
    // After setting the description from the backend data, trigger resize for the descriptionRef textarea
    if (blogId && description && descriptionRef.current) {
      descriptionRef.current.style.height = 'auto'; // Reset height to auto
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`; // Set height to the scroll height
    }
  }, [description, descriptionRef, blogId]);

  useEffect(() => {
    if (!title && !description && !content.length) return;
    const draft = {
      id: draftId,
      title,
      description,
      content: JSON.stringify(content),
    };
    processBlog(draft);
  }, [draftId, title, description, content, processBlog]);

  return (
    <div className="mx-auto max-w-screen-lg">
      {blogId && isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="flex w-full items-center justify-between bg-neutral-50 px-3 py-4">
            <div className="flex items-center gap-5">
              <Logo />
            </div>
            <h1 className="text-md text-neutral-700">Draft</h1>
            <div className="flex gap-1">
              <Button
                variant="secondary"
                size="small"
                onClick={() => navigate(-1)}
              >
                <FaChevronLeft /> Back
              </Button>
              <Modal>
                <Modal.Button id={'publish'}>
                  <Button size="small">Publish</Button>
                </Modal.Button>
                <Modal.Button id={'confirm-delete'}>
                  <Button size="small" variant="danger">
                    Delete
                  </Button>
                </Modal.Button>
                <Modal.Window id="publish">
                  <PublishForm
                    title={title}
                    coverImage={coverImage}
                    category={category}
                    selectCoverImage={setCoverImage}
                    selectCategory={setCategory}
                    onPublish={handlePublishBlog}
                  />
                </Modal.Window>
                <Modal.Window id="confirm-delete">
                  <ConfirmDelete
                    onDelete={() => {
                      if (draftId) {
                        deleteBlog(draftId, { onSuccess: () => reset() });
                        if (blogId) navigate('/home');
                      }
                    }}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </header>
          <div className="mx-auto flex h-full max-w-screen-md flex-col gap-1 rounded-xl bg-neutral-50 py-8 text-neutral-800">
            <div className="mb-3">
              <textarea
                ref={headingRef}
                placeholder="Write your title here"
                className="mb-2 w-full resize-none bg-neutral-50 text-3xl font-medium text-neutral-700 outline-none placeholder:text-neutral-500"
                type="text"
                wrap="hard"
                required
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                ref={descriptionRef}
                placeholder="Write your description here"
                className="w-full resize-none bg-neutral-50 text-lg text-neutral-700 outline-none placeholder:text-neutral-500"
                type="text"
                wrap="hard"
                required
                rows={1}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <BlockNoteView
              editor={editor}
              theme={isDarkMode ? 'dark' : 'light'}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default BlogEditor;
