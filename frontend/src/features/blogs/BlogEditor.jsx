import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import '@blocknote/react/style.css';
import useThemeContext from '../../contexts/useThemeContext';
import {
  createDraft,
  getImageUrl,
  deleteBlog as deleteBlogApi,
  saveDraft,
} from '../../services/api/blog';
import { FaChevronLeft } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import Button from '../../ui-components/common/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../../ui-components/compound-components/Modal';
import ConfirmDelete from '../../ui-components/common/ConfirmDelete';

const initialContent = [];

async function blogProcessing(draft) {
  let data;
  console.log(draft);
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
  const headingRef = useRef();
  const descriptionRef = useRef();
  const coverImgInputRef = useRef();
  const navigate = useNavigate();
  const [draftId, setDraftId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState([]);
  const { isDarkMode } = useThemeContext();

  const { mutate: processBlog } = useMutation({
    mutationFn: blogProcessing,
    onSuccess: (data) => {
      console.log(data);
      if (!draftId) {
        setDraftId(data.blog._id);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate: deleteBlog, status: deletionStatus } = useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      toast.success('The blog is deleted successfully!');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });

  const editor = useBlockNote({
    editable: true,
    initialContent: content,
    defaultStyles: true,
    onEditorContentChange: (editor) => {
      if (editor.topLevelBlocks.length != content.length)
        setContent(editor.topLevelBlocks);
    },
    uploadFile: uploadImage,
  });

  function autoResize() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  }

  useEffect(() => {
    if (!headingRef || !headingRef.current) return;
    const el = headingRef.current;
    el.addEventListener('input', autoResize, false);
    return () => {
      el.removeEventListener('input', autoResize, false);
    };
  }, []);

  useEffect(() => {
    if (!descriptionRef || !descriptionRef.current) return;
    const el = descriptionRef.current;
    el.addEventListener('input', autoResize, false);
    return () => {
      el.removeEventListener('input', autoResize, false);
    };
  }, []);

  useEffect(() => {
    if (deletionStatus === 'success') {
      setTitle('');
      setDraftId('');
      setDescription('');
      setContent([]);
    }
  }, [deletionStatus]);

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
    <>
      <header className="flex w-full items-center justify-between pb-4">
        <h1 className="heading text-2xl">Create Blog</h1>
        <div className="flex gap-1">
          <Button variant="secondary" size="small" onClick={() => navigate(-1)}>
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
              <form className="flex min-w-[20rem] flex-col gap-2">
                <h3 className="font-xl heading ">
                  Publish <span className="font-medium">{title}</span>
                </h3>
                <input type="file" className="w-full" hidden />
                <div className="h-fit w-full rounded-md bg-neutral-200 p-8">
                  <p className="text-center text-sm">
                    Click to select cover image
                  </p>{' '}
                </div>
              </form>
            </Modal.Window>
            <Modal.Window id="confirm-delete">
              <ConfirmDelete
                onDelete={() => {
                  if (draftId) deleteBlog(draftId);
                }}
              />
            </Modal.Window>
          </Modal>
        </div>
      </header>
      <div className="flex h-full flex-col gap-1 rounded-xl bg-neutral-50 py-8 text-neutral-800 shadow-md">
        <div className="px-14">
          <textarea
            ref={headingRef}
            placeholder="Write your title here"
            className="w-full resize-none bg-neutral-50 text-2xl font-medium text-neutral-700 outline-none placeholder:text-neutral-600"
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
            className="w-full resize-none bg-neutral-50 text-lg text-neutral-800 outline-none placeholder:text-neutral-600"
            type="text"
            wrap="hard"
            required
            rows={1}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <BlockNoteView editor={editor} theme={isDarkMode ? 'dark' : 'light'} />
      </div>
    </>
  );
}
export default BlogEditor;
