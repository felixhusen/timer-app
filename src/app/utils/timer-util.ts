/**
 * Generate a random duration between `minDuration` and `maxDuration` in seconds
 * @param minDuration The minimum timer duration
 * @param maxDuration The maximum timer duration
 * @returns 
 */
export function getRandomTimerDuration(
  minDuration: number,
  maxDuration: number
) {
  return Math.floor(
    Math.random() * (maxDuration - minDuration + 1) + minDuration
  );
}
