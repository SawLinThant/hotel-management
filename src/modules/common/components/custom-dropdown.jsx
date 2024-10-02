import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";

const CustomDropdown = ({ options, setOption, initialValue, label, isLabel=true, isOptionValue=true }) => {
  const [selectedOption, setSelectedOption] = useState();

  const transformedData = (options) => {
    return options.map((option) => ({
      label: option.name,
      value: option.id,
    }));
  };

  const dropdownOptions = transformedData(options || []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    if(isOptionValue){
      setOption(option.value);
    }else{
      setOption(option.label)
    }
    
  };

  useEffect(() => {
    if (initialValue) {
      setSelectedOption(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="custom-dropdown-container">
      <style>
        {`
        .custom-dropdown-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          height: 100%;
          border-radius: 0.25rem;
          background-color: transparent;
          cursor: pointer;
          color: black;
          font-family: sans-serif;
          font-size: 16px;
        }
        .custom-dropdown-label {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
        }
        .custom-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          border-radius: 0.25rem;
          z-index: 10;
          background-color: white;
          margin-top:${isLabel?'1rem':'0'};
        }
          .Dropdown-placeholder{
           padding: 0.5rem 0 0.5rem 0.1rem;
           box-shadow:none;
           background-color: whitesmoke;
           border-radius: 0.25rem;
          }
         .Dropdown-control{
         border: 1px solid rgb(61, 58, 58);
         border-radius: 0.25rem;
         }
          .Dropdown-menu{
            border:1px solid gray;
            border-top:none;
             border-bottom-left-radius: 0.25rem;
             border-bottom-right-radius: 0.25rem;
             max-height: 7rem;
             overflow-y:auto;
             scrollbar-width:0.5px;
          }
        .Dropdown-option {
          padding: 8px;
          background-color: white;
          color: black;
          cursor: pointer;
          font-size: 12px;
        }
        .Dropdown-option:hover {
          background-color: purple;
          color: white;
        }
        .Dropdown-option:first-child {
          border-top-left-radius: 0.25rem;
          border-top-right-radius: 0.25rem;
        }
        .Dropdown-option:last-child {
          border-bottom-left-radius: 0.25rem;
          border-bottom-right-radius: 0.25rem;
        }
      `}
      </style>
      <div className="custom-dropdown-label">
        <p>{label}</p>
      </div>

      <Dropdown
        className="custom-dropdown-menu"
        options={dropdownOptions}
        onChange={handleSelect}
        value={selectedOption}
        placeholder="Select an option"
        //   menuClassName="custom-dropdown-menu"
        //   arrowClassName="hidden"
      />
    </div>
  );
};
export default CustomDropdown;
