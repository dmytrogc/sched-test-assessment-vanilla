const formatTime = (date) =>
  new Date(date)
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    })
    .replace(" ", "");

export default formatTime;
