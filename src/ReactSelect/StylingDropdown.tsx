/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

const StylingDropdown = () => {
  // step 1: we have to set the options in an array of object format
  // the object should have keys "value & label"
  const options = [
    { value: "Meshal", label: "Meshal", color: "#FF8B00" },
    { value: "Mark", label: "Mark", color: "#36B37E" },
    { value: "Mike", label: "Mike", color: "#0052CC" },
  ];

  //   styling
  const colorStyles = {
    // control is the container of the react-select
    control: (styles: any) => ({ ...styles, backgroundColor: "white" }),
    option: (styles: any, { data, isDisable, isFocused, isSelected }: any) => {
      console.log("options: ", data, isDisable, isFocused, isSelected);
      return { ...styles, color: data.color }; //get the current selected option and add that particular color
    },

    // these styling only for multi value select labels
    multiValue: (styles: any, { data }: any) => ({
      ...styles,
      backgroundColor: data.color,
      color: "#fff",
    }),
    multiValueLabel: (styles: any, { data }) => ({ ...styles, color: "#fff" }),
    multiValueRemove: (styles: any, { data }) => ({
      ...styles,
      color: "red",
      cursor: "pointer",
      ":hover": { color: "#333" },
    }),
  };

  const handleChange = (selectedOption: any) => console.log(selectedOption);
  // this function will log the selected option in  {value: "...", label:"..."}
  // for multi select it logs as [{value: "...", label:"..."},{value: "...", label:"..."}]

  return (
    <>
      <div className="flex gap-4 p-5">
        <div className="">
          <h1>Single Select</h1>
          <Select
            className="mt-5 w-2xl"
            options={options}
            styles={colorStyles}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <h1>Multi Select</h1>
          <Select
            className="mt-5 w-2xl"
            options={options}
            styles={colorStyles}
            onChange={handleChange}
            isMulti // the handeChange function still the same only the isMulti prop added
          />
        </div>
      </div>
    </>
  );
};

export default StylingDropdown;
