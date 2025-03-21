const intervals = [
  { label: "năm", seconds: 31536000 },
  { label: "tháng", seconds: 2592000 },
  { label: "tuần", seconds: 604800 },
  { label: "ngày", seconds: 86400 },
  { label: "tiếng", seconds: 3600 },
  { label: "phút", seconds: 60 },
  { label: "giây", seconds: 1 },
];

const daysOfWeek = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

export function formatTimeAgo(timestamp: string): string {
  const createdDate = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "" : ""} trước`;
    }
  }
  return "Just now";
}

export function formatDateTime(timestamp?: string): string {
  if (!timestamp) {
    return "";
  }

  const date = new Date(timestamp);

  const dayName = daysOfWeek[date.getDay()];
  return `${dayName}, ${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
