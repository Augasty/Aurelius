import { useState } from 'react';

const MultiSelect = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Replace with your array of options
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const option = e.target.value
    e.preventDefault();
    // Check if the option is already selected
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSubmit = () => {
    // Handle the selected options, you can perform any action here
    console.log("Selected Options:", selectedOptions);
  };

  return (
    <div>
      <label>Select Options:</label>
      <select multiple={true} onChange={(e) => handleOptionChange(e)} value={selectedOptions}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default MultiSelect;