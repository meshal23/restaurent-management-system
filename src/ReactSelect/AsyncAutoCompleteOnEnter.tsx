import { FC, useRef, useState } from "react";
import Select from "react-select";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AsyncAutoCompleteProps {
  loadOptions: (inputVal: string) => any;
  CustomOption: React.FC<any>;
}
const AsyncAutoCompleteOnEnter: FC<AsyncAutoCompleteProps> = ({
  loadOptions,
  CustomOption,
}: AsyncAutoCompleteProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const selectRef = useRef<any>(null);

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

  // when the select input not have any value the menu will be close
  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val.trim() === "") {
      setOptions([]);
      setMenuOpen(false); // close dropdown when input is cleared
    }
  };

  return (
    <Select
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
    />
  );
};

export default AsyncAutoCompleteOnEnter;
