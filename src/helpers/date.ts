import { formatRelative, addDays } from 'date-fns'
import { fr } from 'date-fns/locale'

export const firstDateOfMonth = (
  selectedYear: number,
  selectedMonth: number,
  date: number,
): number => {
  const newDate = new Date(0)
  newDate.setFullYear(selectedYear, selectedMonth, date)

  return newDate.setHours(0, 0, 0, 0)
}

export const dayDiff = (day: number, from: number): number => {
  return (day - from + 7) % 7
}

export const dayOfTheWeekOf = (baseDate: Date, dayOfWeek: number, weekStart = 0): Date => {
  const baseDay = baseDate.getDay()

  return addDays(baseDate, dayDiff(dayOfWeek, weekStart) - dayDiff(baseDay, weekStart))
}

export const addMonths = (date: Date, amount: number): number => {
  const newDate = date
  const monthsToSet = newDate.getMonth() + amount
  let expectedMonth = monthsToSet % 12
  if (expectedMonth < 0) {
    expectedMonth += 12
  }

  const time = newDate.setMonth(monthsToSet)

  return newDate.getMonth() !== expectedMonth ? newDate.setDate(0) : time
}

export const addYears = (date: Date, amount: number): number => {
  const newDate = date
  const expectedMonth = newDate.getMonth()
  const time = newDate.setFullYear(newDate.getFullYear() + amount)

  return expectedMonth === 1 && newDate.getMonth() === 2 ? newDate.setDate(0) : time
}

export const getFormattedDate = (
  language: string,
  date: Date | number,
  options?: Intl.DateTimeFormatOptions,
): string => {
  let defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Paris',
  }
  if (options) defaultOptions = options

  return new Intl.DateTimeFormat(language, defaultOptions).format(date)
}

export const startOfYearPeriod = (date: Date, years: number): number => {
  const year = date.getFullYear()

  return Math.floor(year / years) * years
}

export const formatDateToLocaleDateString = (date: string | null, locale = 'fr-FR'): string =>
  date ? new Date(date).toLocaleDateString(locale) : ''

export const stringToDateOrNow = (dateString?: string) =>
  dateString ? new Date(dateString) : new Date()

export const formatRelativeDate = (dateToFormat: Date) =>
  formatRelative(dateToFormat, new Date(), { locale: { ...fr } })
