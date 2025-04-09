/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import CreatePostForm from "./CreatePostForm";
import { allPosts } from "./PostSlice";
import AuthorForPost from "./AuthorForPost";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostList = () => {
  const posts = useSelector(allPosts);

  return (
    <section className="min-w-full gap-4 flex flex-col justify-center items-center">
      <div className="">
        <CreatePostForm />
      </div>
      {posts?.map((post: any) => {
        return (
          <div
            key={post.id}
            className="block min-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {post.content}
            </p>
            <div className="flex gap-3">
              <AuthorForPost userId={post.userId} />
              <TimeAgo timestamp={post.date} />
              <ReactionButtons post={post} />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default PostList;
