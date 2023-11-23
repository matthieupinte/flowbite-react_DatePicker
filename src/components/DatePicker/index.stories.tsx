import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import DatePicker, { DateRange } from './index'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {},
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = () => {
  const [date, setDate] = useState<Date | DateRange>([
    new Date('2023-01-04T12:00:00'),
    new Date('2023-01-07T14:00:00'),
  ])

  const handleChange = (selectedDate: Date | DateRange) => {
    console.log(selectedDate)
    setDate(selectedDate)
  }

  return <DatePicker onChangeValue={handleChange} date={date} isRange />
}

export const DatePickerTemplate = Template.bind({})
