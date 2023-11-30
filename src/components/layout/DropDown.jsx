
const DropDown = ({setGroup,group}) => {

  // Handler function to update the selected value
  const handleSelectChange = (event) => {
    event.preventDefault();
    setGroup(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" value={group || ''} onChange={handleSelectChange}>
        {/* Add your dropdown options here */}
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

export default DropDown