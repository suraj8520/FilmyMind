import { useNavigate } from 'react-router-dom';
import { LiaEdit, LiaTrashAlt } from 'react-icons/lia';
import { format } from 'date-fns';
import useDeleteBlog from './useDeleteBlog';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../../ui-components/compound-components/Modal';
import ConfirmDelete from '../../ui-components/common/ConfirmDelete';

function MyBlogCard({ blog, type }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { deleteBlog } = useDeleteBlog();
  const { title, description } = blog;

  return (
    <div
      className="card rounded-lg p-4 hover:bg-neutral-100"
      onClick={() => {
        if (type === 'draft') navigate('/edit-blog/' + blog.id);
        else navigate('/blog/' + blog.id);
      }}
    >
      <h2 className="heading text-lg">{title ? title : 'Untitled'}</h2>
      <p className="text-neutral-700">{description ? description : '....'}</p>

      <div className="flex items-end justify-between gap-2">
        <p className="text-sm text-neutral-600">
          {type === 'draft'
            ? format(blog.createdAt, 'MMMM dd, yyyy')
            : format(blog.publishedAt, 'MMMM dd, yyyy')}
        </p>
        {type === 'draft' && (
          <button
            onClick={() => {
              navigate('/edit-blog/' + blog.id);
              console.log('This is not working');
            }}
          >
            <LiaEdit size={24} className="text-brand-600" />
          </button>
        )}
        <Modal>
          <Modal.Button id={'confirm-delete'}>
            <button>
              <LiaTrashAlt size={24} className="text-red-500" />
            </button>
          </Modal.Button>
          <Modal.Window id={'confirm-delete'}>
            <ConfirmDelete
              onDelete={() => {
                deleteBlog(blog.id, {
                  onSuccess: () => {
                    queryClient.invalidateQueries(['drafts']);
                  },
                });
              }}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
export default MyBlogCard;
