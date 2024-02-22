import ArticlePreview from './ArticlePreview';

function TrendingBlog() {
  return (
    <div className="relative w-full rounded-xl shadow-md">
      <div className="aspect-square h-full w-full sm:aspect-video">
        <img
          className="h-full w-full rounded-xl object-cover"
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
      <div className="absolute left-[50%] top-[50%] w-[90%] max-w-[32rem] translate-x-[-50%] rounded-xl bg-neutral-50 p-6 shadow-md sm:bottom-[-2.5rem] sm:left-10 sm:top-auto sm:translate-x-0">
        <ArticlePreview usedIn="trending-section" />
      </div>
    </div>
  );
}

// function TrendingBlog() {
//   return (
//     <div className="relative aspect-video w-full  rounded-xl shadow-md">
//       <img className="h-full w-full rounded-xl object-cover" src="" />
//       <div className="absolute bottom-[-40px] left-10 max-w-[32rem] rounded-xl bg-neutral-50 p-6 shadow-md">
//         <ArticlePreview />
//       </div>
//     </div>
//   );
// }
export default TrendingBlog;
