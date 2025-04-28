/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import CustomOption from "./CustomOption/CustomOption";
import { useRef, useState } from "react";
import AsyncAutoCompleteOnEnter from "./AsyncAutoCompleteOnEnter";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const AsynchronousSelect = () => {
  // states for load options when enter
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const selectRef = useRef<any>(null);

  // end of states load options when enter

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
        label: `${user.name} |  ${user.email}`,
        componentData: user,
        value: user.id,
      }));
    } catch (e) {
      const err = e instanceof Error;
      console.error("Error loading options:", String(err));
    }
  };

  // this function is for only load options when type enter key
  const loadWhenEnter = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setIsLoading(true);
      const results = await loadOptions(inputValue);
      console.log(results);
      setOptions(results || []);
      setIsLoading(false);
      setMenuOpen(true);

      selectRef.current?.focus();
      if (results?.length > 0) {
        setTimeout(() => {
          selectRef.current?.select?.openMenu();
        }, 0);
      }
    }
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val.trim() === "") {
      setOptions([]);
      setMenuOpen(false); // 👈 close dropdown when input is cleared
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
            components={{ Option: CustomOption }}
            onChange={handleChange}
          />
        </div>

        {/* for these requirement asyncSelect won't work properly you might want to use
        regular Select from react-select */}

        <div className="">
          <h1>Select without render all options (when tap enter)</h1>
          {/* <AsyncSelect
            className="mt-5 w-2xl"
            loadOptions={async () => Promise.resolve(options)}
            components={{ Option: CustomOption }}
            onChange={handleChange}
            onInputChange={(value) => setInputValue(value)}
            isLoading={isLoading}
            defaultOptions={false}
            onKeyDown={loadWhenEnter}
            menuIsOpen={undefined}
          /> */}
          {/* <Select
            ref={selectRef}
            className="mt-5 w-2xl"
            options={options}
            isLoading={isLoading}
            onInputChange={handleInputChange}
            components={{ Option: CustomOption }}
            onKeyDown={loadWhenEnter}
            placeholder="Search supplier and hit Enter"
            isClearable
            isSearchable
            menuIsOpen={menuOpen}
            onChange={(val) => {
              console.log("Selected:", val);
              setMenuOpen(false); // close after selection
            }}
          /> */}

          <AsyncAutoCompleteOnEnter
            loadOptions={loadOptions}
            CustomOption={CustomOption}
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
