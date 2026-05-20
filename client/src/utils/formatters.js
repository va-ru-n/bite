export const formatDateTime = (value) =>
  new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const formatNumber = (value) => Number(value || 0).toFixed(1);
