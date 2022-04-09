import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./Style.css";
export default function DatePicker1() {
  const [startDate, setStartDate] = useState(new Date());

  const options = [
    {
      label: "All Employee",
      value: "all",
      img: "",
    },
    {
      label: "Dr. Xavier III",
      value: "emp1",
      img: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      label: "Dr. Don Health",
      value: "emp2",
      img: "https://www.blexar.com/avatar.png",
    },
    {
      label: "Dr. Siegfried Tausend",
      value: "emp3",
      img: "https://www.w3schools.com/w3images/avatar2.png",
    },
  ];

  const [selected, setSelected] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  //   console.log(selected, "selecte");
  const handleChange = (e, event) => {
    if (e.option.value == "all") {
      if (selected.length > 0) {
        setIsAllSelected(false);
        setSelected([]);
      } else {
        setIsAllSelected(true);
        setSelected(options.splice(1, options.length - 1));
      }
    } else {
      const val = selected.map((v) => v.value);
      const check = val.includes(e.option.value);
      console.log(check, "ccc");
      if (check) {
        const a = selected.filter((el) => {
          return el.value !== e.option.value;
        });
        setSelected(a);
      } else {
        setSelected([...selected, e.option]);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row py-5 justify-content-around">
        <div className="col-md-4 ms-5">
          <div>
            <h1>Select Employee Dropdown</h1>
            <pre>{JSON.stringify(selected)}</pre>
            <MultiSelect
              multi
              options={options}
              value={selected}
              //   onChange={setSelected}
              hasSelectAll={false}
              className="select"
              labelledBy="Select"
              valueRenderer={() => {
                return <div style={{ color: "#556e9a" }}>Select</div>;
              }}
              ItemRenderer={(data) => {
                const val = selected.map((v) => v.value);
                return (
                  <>
                    <div
                      className="div-content"
                      onClick={(event) => handleChange(data, event)}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {data.option.value == "all" ? (
                          <div className="counter d-flex justify-content-center align-items-center">
                            {selected.length}
                          </div>
                        ) : (
                          <img src={data.option.img}></img>
                        )}
                        <label for={data.option.label} className="ms-3">
                          {data.option.label}
                        </label>
                      </div>
                      <input
                        type="checkbox"
                        id={data.option.label}
                        name={data.option.label}
                        defaultChecked={
                          val.includes(data.option.value) || isAllSelected
                        }
                      />
                    </div>
                  </>
                );
              }}
            />
          </div>
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Select Date</h1>
          <div className="datepicker">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
