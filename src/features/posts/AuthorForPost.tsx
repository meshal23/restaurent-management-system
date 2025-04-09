/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { allUsers } from "../users/userSlice";

const AuthorForPost = ({ userId }: any) => {
  const users = useSelector(allUsers);
  const author = users?.find((user: any) => user.id === userId);
  return (
    <span className="text-slate-400 italic ">
      created by: {author ? author.name : "Unknown user"}
    </span>
  );
};

export default AuthorForPost;
