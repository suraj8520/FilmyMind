import ArticlePreview from './ArticlePreview';
import { useNavigate } from 'react-router-dom';

const defaultImg =
  'https://firebasestorage.googleapis.com/v0/b/filmymind-apersonalproject.appspot.com/o/placeholder%20img.webp?alt=media&token=e722ebc4-7d22-46ae-853d-11425c6c340c';

function BlogCard({ blog, usedIn = 'home' }) {
  const navigate = useNavigate();
  const { author, category, description, title, publishedAt, coverImage } = blog
    ? blog
    : {};
  return (
    <div
      className="card flex min-h-fit w-full flex-col items-stretch gap-2 rounded-xl p-4"
      onClick={() => navigate('/blog/' + blog.id)}
    >
      <div className="h-fit w-full">
        <img
          src={coverImage ? coverImage : defaultImg}
          className="aspect-video h-auto w-full rounded-md object-cover"
          alt={'Cover Image'}
        />
      </div>
      <ArticlePreview
        author={author}
        category={category}
        description={description}
        title={title}
        publishedAt={publishedAt}
        usedIn={usedIn}
      />
    </div>
  );
}
export default BlogCard;
