import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const dateFormatted = (isoDate: string) => {
  dayjs.extend(relativeTime);
  return dayjs(isoDate).fromNow();
};
