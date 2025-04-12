/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import CreatePostForm from "./CreatePostForm";
import {
  getPostsError,
  getPostsStatus,
  selectAllPosts,
  fetchedPosts,
} from "./PostSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostList = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectAllPosts) as { date: string }[];
  const postStatus = useSelector(getPostsStatus);
  const postError = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch<any>(fetchedPosts());
    }
  }, [dispatch, postStatus]);

  let content;
  if (postStatus === "loading") {
    content = <h1>Loading</h1>;
  } else if (postStatus === "succeed") {
    const orderedPost = posts
      ?.slice()
      .sort((a: any, b: any) => b.date.localeCompare(a.date));
    // here we use slice() to create copy of post array
    // && localeCompare is to compare 2 dates
    content = (
      <div className="w-full mt-5 flex flex-col justify-center items-center gap-3">
        {/* orderedpost used here because new post should be on top of the list */}
        {orderedPost.map((post: { date: string }) => {
          return <PostExcerpt post={post} />;
        })}
      </div>
    );
  } else if (postStatus === " failed") {
    content = <h1>{postError}</h1>;
  }

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="w-full mt-3">
        <CreatePostForm />
      </div>
      {content}
    </section>
  );
};

export default PostList;
