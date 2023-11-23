/**
 * @inspiration https://github.com/OMikkel/tailwind-datepicker-react
 */
import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react'
import DatePickerPopup from './DatePickerPopup'
// import InputText, { Props as InputProps } from '../InputText'
// import { getFormattedDate } from '@helpers'
// import { CalendarIcon } from '@assets'

import { InputTextIconRightWrapper } from './styles'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  Icon?: () => JSX.Element
}
export type DateRange = [Date | null, Date | null]

const getFormattedDate = (ln: string, date: Date, options: Intl.DateTimeFormatOptions) => {
  return new Intl.DateTimeFormat(ln, options).format(date)
}

const CalendarIcon = () => (
  <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIKdmlld0JveD0iMCAwIDE3MiAxNzIiCnN0eWxlPSIgZmlsbDojMjZlMDdmOyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMTcydi0xNzJoMTcydjE3MnoiIGZpbGw9Im5vbmUiPjwvcGF0aD48ZyBmaWxsPSIjMWZiMTQxIj48cGF0aCBkPSJNMjEuNSwyMS41djEyOWg2NC41di0zMi4yNXYtNjQuNXYtMzIuMjV6TTg2LDUzLjc1YzAsMTcuNzgwNSAxNC40Njk1LDMyLjI1IDMyLjI1LDMyLjI1YzE3Ljc4MDUsMCAzMi4yNSwtMTQuNDY5NSAzMi4yNSwtMzIuMjVjMCwtMTcuNzgwNSAtMTQuNDY5NSwtMzIuMjUgLTMyLjI1LC0zMi4yNWMtMTcuNzgwNSwwIC0zMi4yNSwxNC40Njk1IC0zMi4yNSwzMi4yNXpNMTE4LjI1LDg2Yy0xNy43ODA1LDAgLTMyLjI1LDE0LjQ2OTUgLTMyLjI1LDMyLjI1YzAsMTcuNzgwNSAxNC40Njk1LDMyLjI1IDMyLjI1LDMyLjI1YzE3Ljc4MDUsMCAzMi4yNSwtMTQuNDY5NSAzMi4yNSwtMzIuMjVjMCwtMTcuNzgwNSAtMTQuNDY5NSwtMzIuMjUgLTMyLjI1LC0zMi4yNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/>
)

const InputText = (props: InputProps) => <input {...props} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

export interface DatePickerProps extends Omit<InputProps, 'onChangeValue'> {
  onChangeValue?: (value: Date | DateRange) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  id?: string
  language?: string
  autoHide?: boolean
  date: Date | DateRange
  label?: string
  isRange?: boolean
}

const DatePicker = ({
  onChangeValue,
  placeholder,
  id,
  date,
  label,
  autoHide = true,
  language = 'fr',
  required = false,
  disabled = false,
  ...props
}: DatePickerProps) => {
  const InputRef = useRef<HTMLInputElement>(null)
  const DatePickerRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!DatePickerRef?.current) return
      if (!DatePickerRef.current.contains(event.target as Node)) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', (event) => handleClickOutside(event))

    return () => {
      document.removeEventListener('mousedown', (event) => handleClickOutside(event))
    }
  }, [DatePickerRef, InputRef, setShow])

  const getInputValue = () => {
    if (Array.isArray(date) && date[0]) {
      if (date[1])
        return `${getFormattedDate(language, date[0] as Date, {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'Europe/Paris',
        })} - ${getFormattedDate(language, date[1] as Date, {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'Europe/Paris',
        })}`
      else
        return `${getFormattedDate(language, date[0] as Date, {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          timeZone: 'Europe/Paris',
        })} -`
    } else if (date instanceof Date) {
      return getFormattedDate(language, date as Date, {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'Europe/Paris',
      })
    }

    return ''
  }

  return (
    <div className="w-full relative" ref={DatePickerRef}>
      <div>
        <InputText
          id={id}
          placeholder={placeholder}
          required={required}
          tabIndex={0}
          // Icon={() => (
          //   <InputTextIconRightWrapper>
          //     <CalendarIcon />
          //   </InputTextIconRightWrapper>
          // )}
          readOnly
          // label={label}
          onFocus={() => setShow(true)}
          disabled={disabled}
          value={getInputValue()}
          {...props}
        />
      </div>
      {!disabled && show && (
        <DatePickerPopup
          date={date}
          onChangeValue={onChangeValue}
          setShow={setShow}
          autoHide={autoHide}
        />
      )}
    </div>
  )
}

export default DatePicker
