/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { reactionAdded } from "./PostSlice";

const ReactionButtons = ({ post }: any) => {
  const dispatch = useDispatch();

  const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😍",
    coffee: "☕",
  };

  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type="button"
          onClick={() =>
            dispatch(reactionAdded({ postId: post.id, reaction: name }))
          }
        >
          {emoji} {post.reactions[name]}
        </button>
      );
    }
  );
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
