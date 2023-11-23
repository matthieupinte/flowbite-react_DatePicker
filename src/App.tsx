// import logo from './logo.svg';
import React, { useState } from 'react';

import { I18nextProvider } from 'react-i18next';
import './App.css';
import DatePicker, { DateRange } from './components/DatePicker';

import i18n from './i18n'

function App() {
  const [date, setDate] = useState<{ start: Date | null, end: Date | null }>({ start: new Date(), end: new Date() });

  return (
    <div className="App">
      <I18nextProvider i18n={i18n}>
        <div className="w-64">
        <DatePicker isRange autoHide={false} date={[date.start, date.end] as DateRange} onChangeValue={(range) => {
          const [start, end] = range as DateRange;

          setDate({ start, end });
        }} />

        </div>

        <div className="bg-primary" />
      </I18nextProvider>
    </div>
  );
}

export default App;
