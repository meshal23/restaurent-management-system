/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ timestamp }: any) => {
  let timeAgo = "";

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);

    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp}>
      &nbsp;<i className="text-slate-400">{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
