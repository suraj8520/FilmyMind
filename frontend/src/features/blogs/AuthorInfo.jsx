function AuthorInfo() {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-neutral-400">
      <div className="flex items-center gap-2">
        <img src={'/user.png'} className="h-8 w-8" />
        <p>Tracy Wilson</p>
      </div>
      <p>August 20, 2022</p>
    </div>
  );
}
export default AuthorInfo;
