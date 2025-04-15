/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

const BasicExample = () => {
  // step 1: we have to set the options in an array of object format
  // the object should have keys "value & label"
  const options = [
    { value: "Meshal", label: "Meshal" },
    { value: "Mark", label: "Mark" },
    { value: "Mike", label: "Mike" },
  ];

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
            onChange={handleChange}
          />
        </div>

        <div className="">
          <h1>Multi Select</h1>
          <Select
            className="mt-5 w-2xl"
            options={options}
            onChange={handleChange}
            isMulti // the handeChange function still the same only the isMulti prop added
          />
        </div>
      </div>
    </>
  );
};

export default BasicExample;
