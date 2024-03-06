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

export async function getDraft(id) {
  const { data } = await AxiosInstance.get('/api/blogs/drafts/' + id);
  return handleResData(data);
}

export async function deleteBlog(id) {
  const { data } = await AxiosInstance.delete('/api/blogs/' + id);
  return handleResData(data);
}

export async function publishBlog(id, formData) {
  const { data } = await AxiosInstance.patch(
    '/api/blogs/publish/' + id,
    formData,
  );

  return handleResData(data);
}

export async function getBlogById(id) {
  const { data } = await AxiosInstance.get('/api/blogs/' + id);
  return handleResData(data);
}

export async function getAllBlogs(searchParams = '') {
  let url = '/api/blogs';
  if (searchParams) url = url + '?search=' + searchParams;
  const { data } = await AxiosInstance.get(url);
  return handleResData(data);
}

export async function getAuthorsBlogs(authorId) {
  const { data } = await AxiosInstance.get('/api/blogs/by-author/' + authorId);
  return handleResData(data);
}

export async function createComment(blogId, text) {
  const { data } = await AxiosInstance.post(
    '/api/blogs/' + blogId + '/comments/create',
    { text },
  );
  return handleResData(data);
}

export async function getCommentsOfBlog(blogId) {
  const { data } = await AxiosInstance.get(
    '/api/blogs/' + blogId + '/comments',
  );
  return handleResData(data);
}

export async function getDrafts() {
  const { data } = await AxiosInstance.get('/api/blogs/drafts');
  return handleResData(data);
}
