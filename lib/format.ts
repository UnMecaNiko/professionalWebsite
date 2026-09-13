/**
 * Dates in the content are `YYYY-MM-DD`, but partial values exist (`"2026"`).
 * Only the year is displayed, so both shapes render the same way.
 */
export function formatYearRange(startDate: string, endDate: string, ongoingLabel: string): string {
  const start = startDate?.slice(0, 4)
  if (!start) return ""

  const end = endDate?.slice(0, 4)
  if (!end) return `${start} — ${ongoingLabel}`
  if (end === start) return start

  return `${start} — ${end}`
}
