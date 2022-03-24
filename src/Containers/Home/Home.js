import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import axios from "axios";

import DatePicker from "../../Components/DatePicker";
import DataTable from "../../Components/DataTable";

export const dataToArray = (data, searchText) => {
  let newData = data;
  let newTab = [];
  let monthStringency = 0;
  let divide = 0;

  newData.forEach((value) => {
    Object.values(value).forEach((value) => {
      if (value.country_code === searchText) {
        divide++;
        monthStringency = monthStringency + value.stringency;
      }
      newTab.push(value);
    });
  });
  monthStringency = monthStringency / divide;

  return {
    newTab: newTab,
    monthStringency: monthStringency,
  };
};

const monthFromDates = (localeStartDate, localeEndDate) => {
  let month = "";
  if (localeStartDate.includes("01-01") && localeEndDate.includes("01-31")) {
    month = "January";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-28")
  ) {
    month = "February";
  } else if (
    localeStartDate.includes("03-01") &&
    localeEndDate.includes("03-31")
  ) {
    month = "March";
  } else if (
    localeStartDate.includes("04-01") &&
    localeEndDate.includes("04-30")
  ) {
    month = "April";
  } else if (
    localeStartDate.includes("05-01") &&
    localeEndDate.includes("05-31")
  ) {
    month = "May";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-30")
  ) {
    month = "June";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-31")
  ) {
    month = "July";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-31")
  ) {
    month = "August";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-30")
  ) {
    month = "September";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-31")
  ) {
    month = "October";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-30")
  ) {
    month = "November";
  } else if (
    localeStartDate.includes("02-01") &&
    localeEndDate.includes("02-31")
  ) {
    month = "December";
  }
  return month;
};

const Home = () => {
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [data, setData] = useState([[], [], []]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const dates = [selectedDate[0].startDate, selectedDate[0].endDate];
    const [localeStartDate, localeEndDate] = dates.map((d) =>
      d.toLocaleString("fr-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );

    const fetchData = async () => {
      const response = await axios.get(
        `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${localeStartDate}/${localeEndDate}`
      );

      if (response.status != 200) {
        console.log(JSON.stringify(response));
        return;
      }
      if (response.data.status !== undefined) {
        console.log(JSON.stringify(response));
        return;
      }

      const { newTab, monthStringency } = dataToArray(
        Object.values(response.data.data)
      );

      if (searchText) {
        const month = monthFromDates(localeStartDate, localeEndDate);
        if (month !== "") {
          setData([
            {
              date_value: month,
              country_code: searchText,
              stringency: monthStringency.toFixed(2),
            },
          ]);
        }
      } else {
        setData(Object.values(newTab));
      }
    };

    fetchData().catch((error) => {
      console.log(error);
    });
  }, [selectedDate, searchText]);

  return (
    <div className="homeContainer">
      <div className="datePicker">
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="dataTable">
        <DataTable data={data} setSearchText={setSearchText} />
      </div>
    </div>
  );
};

export default Home;
