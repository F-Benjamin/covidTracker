import React from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setSelectedDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={selectedDate}
      />
    </>
  );
};

export default DatePicker;
