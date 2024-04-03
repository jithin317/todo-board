import moment from "moment";

export function getTime(startT) {
  const startTime = startT;
  const d = new Date();
  let text = d.toISOString();
  const endTime = moment(d);
  const duration = moment.duration(endTime.diff(startTime));
  return duration.humanize();
}
