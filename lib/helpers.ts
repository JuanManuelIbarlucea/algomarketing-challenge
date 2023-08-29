export function isDueTomorrow(dueDate: Date): boolean {
  const tommorrow = new Date();
  tommorrow.setDate(tommorrow.getDate() + 1);
  return (
    dueDate.getDate() === tommorrow.getDate() &&
    dueDate.getMonth() === tommorrow.getMonth() &&
    dueDate.getFullYear() === tommorrow.getFullYear()
  );
}

export function isDueWithinMonths(dueDate: Date, months: number = 1): boolean {
  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + months);

  return (
    now.getTime() < dueDate.getTime() && dueDate.getTime() < nextMonth.getTime()
  );
}

export function isDueWithinDays(dueDate: Date, days: number = 1): boolean {
  const now = new Date();
  const futureDay = new Date();
  futureDay.setMonth(now.getDate() + days);

  return (
    now.getTime() <= dueDate.getTime() &&
    dueDate.getTime() <= futureDay.getTime()
  );
}

export function isDueAfterDays(dueDate: Date, days: number = 1): boolean {
  const futureDay = new Date();
  futureDay.setMonth(futureDay.getDate() + days);

  return dueDate.getTime() > futureDay.getTime();
}
