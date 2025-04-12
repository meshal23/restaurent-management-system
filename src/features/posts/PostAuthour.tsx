/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import {
  fetchedUsers,
  getAllError,
  getAllStatus,
  selectAllUsers,
} from "../users/usersSlice";
import { useEffect } from "react";

const PostAuthour = ({ userId }: any) => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(getAllStatus);
  const usersError = useSelector(getAllError);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch<any>(fetchedUsers());
    }
  }, [dispatch, usersStatus]);

  const author = users?.find(async (user: any) => (await user.id) === userId);
  console.log(author);

  return (
    <span className="text-slate-400 italic">
      created by: {author ? author.name : "Unknown user"}
    </span>
  );
};

export default PostAuthour;
