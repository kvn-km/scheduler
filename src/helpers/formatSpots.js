export function formatSpots(spots) {
  let p = "s";
  let n = spots;
  if (spots === 1) {
    p = "";
  }
  if (spots === 0) {
    n = "no";
  }
  return `${n} spot${p} remaining`;
};