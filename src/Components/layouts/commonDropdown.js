import { Autocomplete, TextField } from "@mui/material";

export default function CommonDropdown({
  label,
  options,
  value,
  onChange,
  optionLabel = "name",
}) {
  return (
    <Autocomplete
      options={Array.isArray(options) ? options : []}
       className=" text-black  mt-1 min-w-sm max-w-lg rounded-lg  hover:border-lime-500 "
       
      value={value || null}
      getOptionLabel={(option) => {
        if (!option) return "";
        return option?.[optionLabel] || "";
      }}
      onChange={(e, newValue) => onChange(newValue)}
   sx={{
    "& .MuiOutlinedInput-root": {
      height: 44,
      padding: 2,
      display: "flex",
      alignItems: "center",
     
      maxWidth:"100cm"
    
    },
    "& .MuiOutlinedInput-input": {
      padding: "0 14px",
      height: "44px",
      lineHeight: "44px",
      display: "flex",
      alignItems: "center",
      maxWidth:"100cm"
  
    },
    "& .MuiAutocomplete-endAdornment": {
      top: "50%",
      transform: "translateY(-50%)"
    },
    "& .MuiAutocomplete-listbox": {
      maxHeight: 250,
      maxWidth:"100cm"

    }
  }}
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth  className="flex items-center h-10" />
      )}
    />
  );
}