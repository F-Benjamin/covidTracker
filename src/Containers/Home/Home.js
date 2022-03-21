import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import axios from "axios";

import DatePicker from "../../Components/DatePicker";
import DataTable from "../../Components/DataTable";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [month, setMonth] = useState("");
  const [localeStartDate, setLocaleStartDate] = useState("");
  const [localeEndDate, setLocaleEndDate] = useState("");

  useEffect(() => {
    try {
      // Transformation de la date du picker
      const localeDate = () => {
        setLocaleStartDate(
          selectedDate[0].startDate.toLocaleString("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
        setLocaleEndDate(
          selectedDate[0].endDate.toLocaleString("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
      };
      // Récupération des données
      const fetchData = async () => {
        localeDate();
        const response = await axios.get(
          `https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/${localeStartDate}/${localeEndDate}`
        );
        // Transformation de l'objet en tableau
        let newData = Object.values(response.data.data);
        let newTab = [];
        let monthStringency = 0;
        let divide = 0;
        // On parcourt les dates selectionées
        newData.forEach((value) => {
          let newValue = Object.values(value);
          // On parcourt toutes les clés
          for (let i = 0; i < newValue.length; i++) {
            // Si une recherche est faite par pays, on crée une moyenne de l'indice.
            if (newValue[i].country_code === searchText) {
              divide++;
              monthStringency = monthStringency + newValue[i].stringency;
            }
            // On regroupe les clés dans un seul tableau
            newTab.push(newValue[i]);
          }
        });
        // calcule de la moyenne de l'indice
        monthStringency = monthStringency / divide;
        // Affichage des données suivants la recherche et la date
        const dataToShow = () => {
          if (searchText) {
            if (
              localeStartDate.includes("01-01") &&
              localeEndDate.includes("01-31")
            ) {
              setMonth("January");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-28")
            ) {
              setMonth("February");
            } else if (
              localeStartDate.includes("03-01") &&
              localeEndDate.includes("03-31")
            ) {
              setMonth("March");
            } else if (
              localeStartDate.includes("04-01") &&
              localeEndDate.includes("04-30")
            ) {
              setMonth("April");
            } else if (
              localeStartDate.includes("05-01") &&
              localeEndDate.includes("05-31")
            ) {
              setMonth("May");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-30")
            ) {
              setMonth("June");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-31")
            ) {
              setMonth("July");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-31")
            ) {
              setMonth("August");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-30")
            ) {
              setMonth("September");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-31")
            ) {
              setMonth("October");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-30")
            ) {
              setMonth("November");
            } else if (
              localeStartDate.includes("02-01") &&
              localeEndDate.includes("02-31")
            ) {
              setMonth("December");
            }
            if (searchText && month !== "") {
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

        dataToShow();
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedDate, searchText, month, localeStartDate, localeEndDate]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
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
