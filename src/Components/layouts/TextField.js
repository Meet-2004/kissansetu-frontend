import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function BasicTextFields({
  placeholder,
  name,
  className,
  onChange,
  value,
}) {
  return (
    <Box
      component="form"
      className={className}
        sx={{
        "& .MuiOutlinedInput-root": {
          height: 42,
        //   padding: 2,
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
      //   sx={{

      //       "& .MuiOutlinedInput-root": {
      //       height: 44,
      //     //   padding: 2,
      //     //   display: "flex",
      //     //   alignItems: "center",
      //     //   maxWidth: "100cm",
      //     //   position:"absolute"
      //      alignItems: "center",
      //      display:"flex",
      //     },
      //     "& .MuiOutlinedInput-input": {
      //     //   padding: "0 14px",
      //     //   height: "44px",
      //     //   lineHeight: "44px",
      //     //   display: "flex",
      //     //   alignItems: "center",
      //     //   maxWidth: "100cm",
      //     // bottom:"5cm",
      //     // position:"relative",
      //     // top:"50cm",
      //     //  display:"flex",
      //     // justifyItems:"center",
      //     // alignItems:"center",
      //     // justifyContent:"center",
      //     // alignContent:"center",
      //     // height:30,
      //     // bottom:5,
      //     // top:0,
      //      height: "44px",
      // padding: "0 14px",   // important
      // boxSizing: "border-box",

      //     },
      //     "& .MuiAutocomplete-endAdornment": {
      //     //   top: "50%",
      //     //   transform: "translateY(-50%)",
      //     },
      //     "& .MuiAutocomplete-listbox": {
      //     //   maxHeight: 250,
      //     //   maxWidth: "100cm",
      //     },

      //  } }
    //   sx={{
    //     "& .MuiOutlinedInput-root": {

    //       height:44,
    //     // minWidth: {
    //     //     xs:"9.2cm",
    //     //     sm: "5cm",
    //     //     md: "14.8cm",
    //     //   },
    //     //   maxWidth: {
    //     //     xs:"15cm",
    //     //     sm: "7cm",
    //     //     md:"30cm",
    //     //   },
    //       display: "flex",
    //       alignItems: "center",
    //     },

        // "& .MuiOutlinedInput-input": {
        //   padding: "0 14px",
        //   boxSizing: "border-box",
        // },
    //   }}
      noValidate
      autoComplete="off"
    >
      {/* <TextField id="outlined-basic"  label={name} value={value} variant="outlined" placeholder={placeholder} name={name} className={className} onChange={onChange} /> */}
      {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      <TextField
        id="outlined-basic"
        //   label={name}
        //   variant="outlined"
        placeholder={placeholder}
        name={name}
        value={value}
        fullWidth
        onChange={onChange}
              className={className}

        InputLabelProps={{ shrink: true }}
        // size="small"
      />
    </Box>
  );
}
