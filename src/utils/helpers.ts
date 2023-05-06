interface DateRange {
  start: Date;
  end: Date;
}

export function checkDateOverlap(
  dateRange: DateRange,
  dateRanges: DateRange[]
): boolean {
  console.log(dateRange);
  console.log(dateRanges[0]);

  for (const range of dateRanges) {
    if (dateRange.start <= range.end && range.start <= dateRange.end) {
      console.log("you are here");
      return true;
    }
  }
  return false;
}
