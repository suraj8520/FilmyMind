import { useNavigate } from 'react-router-dom';

const defaultImg =
  'https://firebasestorage.googleapis.com/v0/b/filmymind-apersonalproject.appspot.com/o/placeholder%20img.webp?alt=media&token=e722ebc4-7d22-46ae-853d-11425c6c340c';

function AsideCard({ blog }) {
  const navigate = useNavigate();
  const { description, title, coverImage } = blog ? blog : {};
  return (
    <div
      className="card flex w-full items-center gap-4 rounded-md p-2 hover:bg-neutral-200"
      onClick={() => navigate('/blog/' + blog.id)}
    >
      <div className="h-fit w-28">
        <img
          src={coverImage ? coverImage : defaultImg}
          className="aspect-video h-auto w-full rounded-md object-cover"
          alt={'Cover Image'}
        />
      </div>
      <div>
        <h2 className={'text-lg font-medium text-neutral-700 '}>{title}</h2>
        <p className="text-neutral-600">{description}</p>
      </div>
    </div>
  );
}
export default AsideCard;
