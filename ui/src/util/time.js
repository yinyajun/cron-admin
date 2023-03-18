export function timestampToTime(timestamp) {
  if (timestamp === 0) {
    return ``
  }
  const date = new Date(timestamp);
  const Y = date.getFullYear();
  const M = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
  const D = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
  const h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
  const m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  const s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}


export function durationHuman(duraion) {
  if (duraion <= 0) {
    return NaN
  }

  if (duraion < 60) {
    return duraion + "s"
  }
  if (duraion < 60 * 60) {
    return (duraion / 60).toFixed(2) + 'min'
  }
  return (duraion / 3600).toFixed(2) + 'h'
}
