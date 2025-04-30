import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
  } from "@/components/ui/select"; // Adjust import path based on your UI library
  
  interface SelectInputProps {
    label: string;
    name: string;
    options: { label: string; value: string }[];
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
    className?: string;
  }
  
  export function SelectInput({
    label,
    name,
    options,
    placeholder,
    value,
    onValueChange,
    className = "",
  }: SelectInputProps) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {label && <label className="text-sm font-medium">{label}</label>}
        <Select value={value} onValueChange={onValueChange} dir='rtl'>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <input type="hidden" name={name} value={value} />
      </div>
    );
  }