import React from "react";
import MUIDataTable from "mui-datatables";

const DataTable = ({ data, setSearchText }) => {
  const columns = [
    {
      name: "date_value",
      label: "Dates / Month",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "country_code",
      label: "Countries",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "stringency",
      label: "Stringency",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "confirmed",
      label: "Confirmed",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "deaths",
      label: "Deaths",
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    download: "false",
    print: "false",
    selectableRows: "none",
    onSearchChange: (searchText) => {
      if (searchText) {
        setSearchText(searchText.toUpperCase());
      } else {
        setSearchText("");
      }
    },
  };
  return (
    <>
      <MUIDataTable
        title={"Oxford COVID-19 Data"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default DataTable;
