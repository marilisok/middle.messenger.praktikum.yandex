export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  let mm: string | number = date.getMonth() + 1;
  let dd: string | number = date.getDate();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  return `${dd}.${mm}.${yyyy}`;
}

export function formatDateWithTime(dateStr: string) {
  const date = new Date(dateStr);
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes} ${formatDate(dateStr)}`;
}
