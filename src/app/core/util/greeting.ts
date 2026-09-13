export function greeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 10) return 'Jó reggelt!';
  if (hour >= 10 && hour < 18) return 'Jó napot!';
  if (hour >= 18 && hour < 23) return 'Jó estét!';
  return 'Szia!';
}
