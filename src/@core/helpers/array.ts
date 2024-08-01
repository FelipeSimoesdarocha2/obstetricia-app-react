export function orderAsc<T extends { date: string }>(array: T[]): T[] {
  return array.sort((current, next) => (current.date < next.date ? -1 : 0));
}
