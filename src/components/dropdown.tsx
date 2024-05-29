export interface DropdownOption {
  displayText: string;
  value: string
}
export function Dropdown({ options, onOptionSelected }: { options: DropdownOption[], onOptionSelected: (option: DropdownOption) => void}) {
  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const optionSelected = e.target.value;
    const option = options.find(x => x.value === optionSelected)!;

    onOptionSelected(option)
  }
  return (
    <select onChange={handleOnChange}>
      {options.map(option => {
        return <option 
          key={option.value}
          value={option.value} 
          >{option.displayText}</option>
      })}
    </select>
  )
}