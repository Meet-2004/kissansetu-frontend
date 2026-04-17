import { Autocomplete, TextField } from "@mui/material";

export default function CommonDropdown({
  label,
  options,
  value,
  onChange,
  name,
  placeholder,
  className,
  
  optionLabel = "name",
}) {
  return (
    <Autocomplete
      options={Array.isArray(options) ? options : []}
      className={className}
      value={value || null}
      isOptionEqualToValue={(option, selectedValue) =>
        option?.id === selectedValue?.id
      }
      name={name}
      onChange={(e, newValue) => {
   onChange(name, newValue || null);
}}
      getOptionLabel={(option) => {
        if (!option) return "";
        return option?.[optionLabel] || "";
      }}
      // onChange={(e, newValue) => onChange(newValue)}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 44,
          // padding: 2,
          display: "flex",
          alignItems: "center",
      //  minWidth: {
      //       xs:"5cm",
      //       sm: "5cm",
      //       md: "14.8cm",
      //     },
      //     maxWidth: {
      //       xs:"9.2cm",
      //       sm: "7cm",
      //       md:"30cm",
      //     },
        },
        "& .MuiOutlinedInput-input": {
          padding: "0 14px",
          height: "44px",
          lineHeight: "44px",
          display: "flex",
          alignItems: "center",
          // maxWidth: "100cm",
        },
        "& .MuiAutocomplete-endAdornment": {
          top: "50%",
          transform: "translateY(-50%)",
        },
        "& .MuiAutocomplete-listbox": {
          // maxHeight: 250,
          // maxWidth: "100cm",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // label={label}
          fullWidth
          name={name}
          // className={className}
          InputLabelProps={{ shrink: true }}
          placeholder={placeholder}
        />
      )}
    />
  );
}
