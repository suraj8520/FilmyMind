function UserAvatar({ image, name }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={image ? image : '/user.png'}
        className="aspect-square w-8 rounded-full object-cover"
      />
      <p>{name}</p>
    </div>
  );
}
export default UserAvatar;
