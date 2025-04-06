/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthour = ({ userId }: any) => {
  const users = useSelector(selectAllUsers);
  const author = users?.find((user: any) => user.id === userId);

  return (
    <span className="text-slate-400 italic">
      created by: {author ? author.name : "Unknown user"}
    </span>
  );
};

export default PostAuthour;
