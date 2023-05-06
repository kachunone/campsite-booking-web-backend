interface DateRange {
  start: Date;
  end: Date;
}

export function checkDateOverlap(
  dateRange: DateRange,
  dateRanges: DateRange[]
): boolean {
  for (const range of dateRanges) {
    if (dateRange.start <= range.end && range.start <= dateRange.end) {
      return true;
    }
  }
  return false;
}
