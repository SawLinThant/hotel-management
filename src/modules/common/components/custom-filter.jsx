import { useState, useRef } from "react";
import { FaSortDown } from "react-icons/fa";

const CustomFilter = ({ setOptions, option, selectLabel="Select Status",filter }) => {
  //const [filter, setFilter] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const handleFilter = (value) => {
    setOptions(value);
   // setFilter(value);
    setIsOpen(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const options = [
    {
        value: "all",
        label: "All"
    },
    {
        value: "pending",
        label: "Pending"
    },
    {
        value: "complete",
        label: "Complete"
    },
  ]

  console.log(filter)

    return(
        <div
      className="relative w-44 h-11 bg-white rounded-md border border-primary flex items-center justify-center text-black text-lg font-sans cursor-pointer transition duration-500 hover:text-gray-800"
      onClick={toggleDropdown}
      ref={selectRef}
    >
      <div className="flex justify-between items-center w-11/12 h-full text-black transition duration-500">
        <p className="m-0">
          {option.find((opt) => opt.value === filter)?.label ||
            selectLabel}
        </p>
        <FaSortDown />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full border border-gray-700 border-t-0 mt-1 z-10 rounded-md">
          {option.map((option) => (
            <div
              key={option.value}
              className="px-2 py-1 bg-white text-black cursor-pointer transition duration-300 hover:bg-primary hover:text-white first:rounded-t-md last:border-b last:rounded-b-md"
              onClick={() => handleFilter(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
    )
}
export default CustomFilter;