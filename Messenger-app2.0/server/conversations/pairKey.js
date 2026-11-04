export function pairKey(
  firstUserId,
  secondUserId
) {
  return [
    firstUserId.toString(),
    secondUserId.toString()
  ]
    .sort()
    .join(':');
}
