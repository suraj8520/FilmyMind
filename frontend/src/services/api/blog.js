import AxiosInstance from '../AxiosInstance';
import { handleResData } from './user';

export async function getImageUrl(formData) {
  const { data } = await AxiosInstance.post(
    '/api/blogs/upload-image',
    formData,
  );
  return handleResData(data);
}

export async function createDraft(draft) {
  const { data } = await AxiosInstance.post('/api/blogs/create', draft);
  return handleResData(data);
}

export async function saveDraft(draft) {
  const { data } = await AxiosInstance.patch(
    '/api/blogs/drafts/' + draft.id,
    draft,
  );
  return handleResData(data);
}

export async function deleteBlog(id) {
  const { data } = await AxiosInstance.delete('/api/blogs/' + id);
  return handleResData(data);
}
