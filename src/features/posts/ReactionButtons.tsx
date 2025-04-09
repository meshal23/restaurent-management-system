/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { addReaction } from "./PostSlice";

const ReactionButtons = ({ post }: any) => {
  const dispatch = useDispatch();

  const reactionEmojis = {
    like: "👍",
    wow: "😍",
    cry: "😭",
  };

  const reactionButtons = (
    Object.entries(reactionEmojis) as [keyof typeof reactionEmojis, string][]
  ).map(([name, emoji]) => {
    return (
      <button
        key={post.id}
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
