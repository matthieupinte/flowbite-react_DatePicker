import tw from 'tailwind-styled-components'

interface DayProps {
  $isSelected: boolean
  $isCurrentMonthAndYear: boolean
  $isDisabledDate: boolean
  $isInRange: boolean
}

interface DecadeProps {
  $isSelected: boolean
  $isDisabled: boolean
  $isInRange: boolean
}

interface MonthProps {
  $isSelected: boolean
  $isInRange: boolean
}

interface YearProps {
  $isSelected: boolean
  $isDisabled: boolean
  $isInRange: boolean
}

export const WeekDaysContainer = tw.div`
  grid
  grid-cols-7
  mb-1
`

export const WeekDay = tw.span`
  h-6
  text-xs
  font-bold
  leading-6
  text-center
  text-dark
  uppercase
`

export const DaysContainer = tw.div`
  grid
  w-64
  grid-cols-7
  gap-1
`

export const Day = tw.span<DayProps>`
  hover:bg-gray-100
  flex
  items-center
  justify-center
  flex-1
  border-0
  rounded-xl
  h-8
  w-8
  cursor-pointer
  text-center
  font-medium
  text-base
  text-primary
  ${({ $isInRange }: DayProps) => $isInRange && 'bg-primary-soft'}
  ${({ $isSelected }: DayProps) =>
    $isSelected && 'bg-primary text-primary-contrast hover:bg-action-hover'}
  ${({ $isCurrentMonthAndYear, $isDisabledDate }: DayProps) =>
    (!$isCurrentMonthAndYear || $isDisabledDate) && 'invisible'}
`

export const DecadesContainer = tw.div`
  grid
  w-64
  grid-cols-4
`

export const Decade = tw.span<DecadeProps>`
  hover:bg-gray-100
  block
  flex-1
  leading-9
  border-0
  rounded-lg
  cursor-pointer
  text-center
  font-semibold
  text-sm
  text-dark
  ${({ $isInRange }: DecadeProps) => $isInRange && 'bg-primary-soft'}
  ${({ $isSelected }: DecadeProps) =>
    $isSelected && 'bg-blue-700 text-primary-contrast hover:bg-blue-600'}
  ${({ $isDisabled }: DecadeProps) => $isDisabled && 'text-gray-500'}
`

export const MonthsContainer = tw.div`
  grid
  w-64
  grid-cols-4
`

export const Month = tw.span<MonthProps>`
  hover:bg-gray-100
  block
  flex-1
  leading-9
  border-0
  rounded-lg
  cursor-pointer
  text-center
  font-semibold
  text-sm
  text-dark
  ${({ $isInRange }: MonthProps) => $isInRange && 'bg-primary-soft'}
  ${({ $isSelected }: MonthProps) =>
    $isSelected && 'bg-blue-700 text-primary-contrast hover:bg-blue-600'}
`

export const YearsContainer = tw.div`
  grid
  w-64
  grid-cols-4
`

export const Year = tw.span<YearProps>`
  hover:bg-gray-100
  block
  flex-1
  leading-9
  border-0
  rounded-lg
  cursor-pointer
  text-center
  font-semibold
  text-sm
  text-dark
  ${({ $isInRange }: YearProps) => $isInRange && 'bg-primary-soft'}
  ${({ $isSelected }: YearProps) =>
    $isSelected && 'bg-blue-700 text-primary-contrast hover:bg-blue-600'}
  ${({ $isDisabled }: YearProps) => $isDisabled && 'text-gray-500'}
`

export const DatePickerPopupContainer = tw.div`
  absolute
  z-50
  block
  pt-2
  top-14
`

export const DatePickerPopupSubContainer = tw.div`
  inline-block
  p-4
  bg-primary-contrast
  rounded-2xl
  border
  border-solid
  border-darkLight
`

export const DatePickerPopupButtonsContainer = tw.div`
  flex
  justify-between
  items-center
  mb-2
`

export const MonthSelector = tw.a`
  no-underline
  text-primary
  font-bold
  capitalize
`

export const InputTextIconRightWrapper = tw.div`
  absolute
  top-[calc(50%-12px)]
  right-4
  text-primary
  z-10
`
