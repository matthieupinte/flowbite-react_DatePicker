/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { ForwardedRef, forwardRef, useState, useEffect, HtmlHTMLAttributes } from 'react'
import {
  addDays,
  addMonths,
  addYears,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  format,
  isAfter,
  isBefore,
  setYear,
  getYear,
  getDecade,
} from 'date-fns'
import { dayOfTheWeekOf, getFormattedDate, startOfYearPeriod } from '../../helpers/date'
import {
  DatePickerPopupButtonsContainer,
  DatePickerPopupContainer,
  DatePickerPopupSubContainer,
  Day,
  DaysContainer,
  Decade,
  DecadesContainer,
  Month,
  MonthSelector,
  MonthsContainer,
  WeekDay,
  WeekDaysContainer,
  Year,
  YearsContainer,
} from './styles'
import { useTranslation } from 'react-i18next'
// import IconButton from '../IconButton'
// import { ArrowLeftIcon, ArrowRightIcon } from '@assets'
// import { ButtonVariant } from '../Button'

import type { DateRange } from './index'
type Views = 'days' | 'months' | 'years' | 'decades'

type IconButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  Icon: React.ReactElement;
}

const ArrowLeftIcon = <i>{'<'}</i>
const ArrowRightIcon = <i>{'>'}</i>
const IconButton = (props: IconButtonProps) => <button {...props}>{props.Icon}</button>

const goToPrevNext = (view: Views, date: Date, direction: number): Date => {
  switch (view) {
    case 'days':
      return addMonths(date, direction)
    case 'months':
      return addYears(date, direction)
    case 'years':
      return addYears(date, direction * 10)
    case 'decades':
      return addYears(date, direction * 100)
    default:
      return addYears(date, direction * 10)
  }
}

interface DatePickerPopupProps {
  date: Date | DateRange
  setShow: (show: boolean) => void
  onChangeValue?: (date: Date | DateRange) => void
  maxDate?: Date | null
  minDate?: Date | null
  autoHide?: boolean
  language?: string
}

const DatePickerPopup = forwardRef(
  (
    {
      date,
      setShow,
      onChangeValue,
      maxDate,
      minDate,
      autoHide = true,
      language = 'fr',
    }: DatePickerPopupProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { t } = useTranslation()
    const weekDays: string[] = [
      t('weekDaysAbbreviations.monday'),
      t('weekDaysAbbreviations.tuesday'),
      t('weekDaysAbbreviations.wednesday'),
      t('weekDaysAbbreviations.thursday'),
      t('weekDaysAbbreviations.friday'),
      t('weekDaysAbbreviations.saturday'),
      t('weekDaysAbbreviations.sunday'),
    ]

    const isRange = Array.isArray(date) && date.length === 2
    // @ts-ignore
    const [startDate, setStartDate] = useState<Date>((isRange ? date[0] : date) || new Date())
    // @ts-ignore
    const [endDate, setEndDate] = useState<Date | null>(isRange ? date[1] : date)
    const [displayedDate, setDisplayedDate] = useState<Date>(startDate)

    const firstOfMonth = startOfMonth(displayedDate)
    const start = dayOfTheWeekOf(firstOfMonth, 1, 1)

    const [view, setView] = useState<Views>('days')

    const calculateView = (): Views => {
      if (view === 'days') return 'months'
      if (view === 'months') return 'years'
      if (view === 'years') return 'decades'

      return view
    }

    useEffect(() => {
      if (Array.isArray(date)) {
        setStartDate(date[0] as Date)
        setEndDate(date[1] as Date)
      }
    }, [date])

    const changeSelectedDate = (action: 'prev' | 'next' | 'date' | 'today', date: Date) => {
      const hide = autoHide && view === 'days' && action === 'date'

      if (isRange) {
        if (startDate && !endDate) {
          if (date < startDate) {
            setEndDate(startDate)
            setStartDate(date)
            onChangeValue?.([date, startDate])
          } else {
            setEndDate(date)
            onChangeValue?.([startDate, date])
          }
          setShow(!hide)
        } else {
          setStartDate(date)
          setEndDate(null)
          onChangeValue?.([date, null])
        }
      } else {
        onChangeValue?.(date)
        setShow(!hide)
      }
    }

    const renderView = (view: Views) => {
      switch (view) {
        case 'days':
          return (
            <>
              <WeekDaysContainer>
                {weekDays.map((day, index) => (
                  <WeekDay key={index}>{day}</WeekDay>
                ))}
              </WeekDaysContainer>
              <DaysContainer>
                {[...Array(42)].map((_, index) => {
                  const current = addDays(start, index)
                  const currentDate = new Date(current)
                  const day = getFormattedDate(language, current, { day: 'numeric' })
                  const month = getFormattedDate(language, current, { month: 'long' })
                  const year = getFormattedDate(language, current, { year: 'numeric' })

                  let isSelected = false
                  let isInRange = false

                  if (isRange) {
                    if (startDate && !endDate) {
                      isSelected = isSameDay(currentDate, startDate) || false
                    } else if (endDate && startDate) {
                      isSelected =
                        isSameDay(currentDate, startDate) || isSameDay(currentDate, endDate) || false
                      isInRange = currentDate > startDate && currentDate < endDate || false
                    }
                  } else {
                    isSelected = isSameDay(currentDate, startDate) || false
                  }

                  return (
                    <Day
                      key={index}
                      $isInRange={isInRange}
                      $isSelected={isSelected}
                      $isDisabledDate={
                        (minDate && new Date(current) < minDate) ||
                        (maxDate && new Date(current) > maxDate) || false
                      }
                      $isCurrentMonthAndYear={
                        month == getFormattedDate(language, displayedDate, { month: 'long' }) &&
                        year == getFormattedDate(language, displayedDate, { year: 'numeric' })
                      }
                      onClick={() => {
                        changeSelectedDate('date', new Date(current))
                      }}
                    >
                      {day}
                    </Day>
                  )
                })}
              </DaysContainer>
            </>
          )
        case 'months':
          return (
            <MonthsContainer>
              {[...Array(12)].map((_month, index) => {
                const month = new Date(displayedDate.getFullYear(), index)

                const isSelected =
                  isSameMonth(month, startDate) || (endDate && isSameMonth(month, endDate)) || false
                const isInRange = endDate && isAfter(month, startDate) && isBefore(month, endDate) || false

                return (
                  <Month
                    key={index}
                    $isSelected={isSelected}
                    $isInRange={isInRange}
                    onClick={() => {
                      setDisplayedDate(
                        new Date(addMonths(displayedDate, index - displayedDate.getMonth())),
                      )
                      setView('days')
                    }}
                  >
                    {format(month, 'MMM')}
                  </Month>
                )
              })}
            </MonthsContainer>
          )
        case 'years':
          return (
            <YearsContainer>
              {[...Array(12)].map((_, index) => {
                const first = startOfYearPeriod(displayedDate, 10)
                const year = new Date(first - 1 + index * 1, 0, 1)

                const isSelected =
                  isSameYear(year, startDate) || (endDate && isSameYear(year, endDate)) || false
                const isInRange = endDate && isAfter(year, startDate) && isBefore(year, endDate) || false

                return (
                  <Year
                    key={index}
                    $isDisabled={index == 0 || index == 11}
                    $isSelected={isSelected}
                    $isInRange={isInRange}
                    onClick={() => {
                      setDisplayedDate(setYear(displayedDate, getYear(year)))
                      setView('months')
                    }}
                  >
                    {format(year, 'yyyy')}
                  </Year>
                )
              })}
            </YearsContainer>
          )
        case 'decades':
          return (
            <DecadesContainer>
              {[...Array(12)].map((_year, index) => {
                const first = getDecade(displayedDate)
                const year = new Date(first - 10 + index * 10, 0, 1)

                const isSelected =
                  getDecade(year) === getDecade(startDate) ||
                  (endDate && getDecade(year) === getDecade(endDate)) || false
                const isInRange =
                  endDate && isAfter(year, startDate) && isBefore(addYears(year, 11), endDate) || false

                return (
                  <Decade
                    key={index}
                    $isSelected={isSelected}
                    $isInRange={isInRange}
                    $isDisabled={index == 0 || index == 11}
                    onClick={() => {
                      setDisplayedDate(setYear(displayedDate, getYear(year)))
                      setView('years')
                    }}
                  >
                    {format(year, 'yyyy')}
                  </Decade>
                )
              })}
            </DecadesContainer>
          )
        default:
          return null
      }
    }

    return (
      <DatePickerPopupContainer ref={ref} data-testid="date-picker-popup">
        <DatePickerPopupSubContainer>
          <div>
            <DatePickerPopupButtonsContainer>
              <IconButton
                onClick={() => setDisplayedDate(goToPrevNext(view, displayedDate, -1))}
                // description={t('datePicker.action.previous')}
                Icon={ArrowLeftIcon}
                // variant={ButtonVariant.secondary}
              />

              <MonthSelector onClick={() => setView(calculateView())}>
                {view === 'days' &&
                  getFormattedDate(language, displayedDate, { month: 'long', year: 'numeric' })}
                {view === 'months' &&
                  getFormattedDate(language, displayedDate, { year: 'numeric' })}
                {view === 'years' &&
                  `${startOfYearPeriod(displayedDate, 10)}-${
                    startOfYearPeriod(displayedDate, 10) + 9
                  }`}
                {view === 'decades' &&
                  `${startOfYearPeriod(displayedDate, 100)}-${
                    startOfYearPeriod(displayedDate, 100) + 90
                  }`}
              </MonthSelector>

              <IconButton
                onClick={() => setDisplayedDate(goToPrevNext(view, displayedDate, 1))}
                // description={t('datePicker.action.previous')}
                Icon={ArrowRightIcon}
                // variant={ButtonVariant.secondary}
              />
            </DatePickerPopupButtonsContainer>
          </div>
          <div className="p-1">
            {view === 'days' && renderView('days')}
            {view === 'months' && renderView('months')}
            {view === 'years' && renderView('years')}
            {view === 'decades' && renderView('decades')}
          </div>
        </DatePickerPopupSubContainer>
      </DatePickerPopupContainer>
    )
  },
)
DatePickerPopup.displayName = 'DatePickerPopup'

export default DatePickerPopup
