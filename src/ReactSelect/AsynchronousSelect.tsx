/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import AsyncSelect from "react-select/async";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const AsynchronousSelect = () => {
  const handleChange = (selectedOption: any) => console.log(selectedOption);

  /* 

  ---- this is we call callback type loadOptions we it takes 2 
       arguments inputValue and callback
  ---- this is typically used for add debouce logic or abort logic 
  
  const timeoutRef = useRef(null);

  const loadOptions = (inputValue, callback) => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Add debounce: wait 500ms before calling the API
    timeoutRef.current = setTimeout(async () => {
      const users = await fetchUsers();
      const filtered = users
        .filter((u) =>
          u.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((u) => ({
          value: u.id,
          label: u.name,
        }));

      callback(filtered); // Send result to react-select
    }, 500);
  };
  
  
  */

  // this is promise type loadOptions we also have callback type loadOptions we saw earlier
  const loadOptions = async (inputValue: string) => {
    try {
      const response = await axios.get(API_URL);

      const users = response.data;

      const filteredUsers = users?.filter((user: any) =>
        user.name.toLowerCase()?.includes(inputValue.toLowerCase())
      );

      return filteredUsers?.map((user: any) => ({
        label: user.name,
        value: user.id,
      }));
    } catch (e) {
      const err = e instanceof Error;
      console.error("Error loading options:", String(err));
    }
  };
  return (
    <>
      <div className="flex p-4 gap-4">
        <div className="">
          <h1>Select without render all options</h1>
          <AsyncSelect
            className="mt-5 w-2xl"
            loadOptions={loadOptions}
            onChange={handleChange}
          />
        </div>

        <div className="">
          <h1>Select with render all options with multi select</h1>
          <AsyncSelect
            className="mt-5 w-2xl"
            loadOptions={loadOptions}
            defaultOptions
            isMulti
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default AsynchronousSelect;
