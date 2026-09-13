export function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

export function isFutureIsoDate(isoDate: string): boolean {
  return isoDate > todayIso();
}

export function isValidIsoDate(isoDate: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    return false;
  }
  const parsed = new Date(`${isoDate}T00:00:00`);
  return !Number.isNaN(parsed.getTime()) && toIsoDate(parsed) === isoDate;
}
