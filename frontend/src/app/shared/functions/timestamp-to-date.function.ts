export function timestampToDate(timestamp: number) {
  const parsedTimestamp = new Date(timestamp * 1000);
  return parsedTimestamp.getFullYear() + '-' + parsedTimestamp.getMonth() + 1 + '-' + parsedTimestamp.getDate();
}
