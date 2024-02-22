import ArticlePreview from './ArticlePreview';

function BlogCard() {
  return (
    <div className="card flex h-fit w-full flex-col items-start gap-2 rounded-xl p-4">
      <div className="aspect-video w-full overflow-hidden rounded-md">
        <img
          src={
            'https://firebasestorage.googleapis.com/v0/b/filmymind-apersonalproject.appspot.com/o/placeholder%20img.webp?alt=media&token=e722ebc4-7d22-46ae-853d-11425c6c340c'
          }
          className=" h-full w-full object-cover"
          alt={'Cover Image'}
        />
      </div>
      <ArticlePreview />
    </div>
  );
}
export default BlogCard;
