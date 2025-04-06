/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import CreatePostForm from "./CreatePostForm";
import { selectAllPosts } from "./PostSlice";
import PostAuthour from "./PostAuthour";
import TimeAgo from "./TimeAgo";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full mt-3">
        <CreatePostForm />
      </div>

      {/* post list */}
      <div className="w-full mt-5 flex flex-col justify-center items-center gap-3">
        {posts.map((post: any) => {
          return (
            <div
              key={post.id}
              className="block min-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-800 dark:text-gray-400">
                {post.description}
              </p>
              <p className="flex gap-4">
                <PostAuthour userId={post.userId} />
                <TimeAgo timestamp={post.date} />
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PostList;
