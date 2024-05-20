import { TextField } from "@mui/material";
import React, { useState } from "react";

interface CSInputProps {
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  label?: string;
  fullWidth?: boolean;
  autoComplete?: string;
  color?: "primary" | "error" | "secondary" | "info" | "success" | "warning";
  size?: "small" | "medium";
  sx?: object;
}

const CSInput: React.FC<CSInputProps> = (props) => {
  const {
    value,
    onChange,
    type,
    label,
    name,
    fullWidth,
    autoComplete,
    color,
    size,
    sx,
    ...otherProps
  } = props;

  const [error, setError] = useState<boolean>(false);
  const [helperText, setHelperText] = useState<string>("");
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleBlur = () => {
    if (!value.toString().trim()) {
      setError(true);
      setHelperText("This field is required");
    } else if (type === "email" && !emailRegex.test(value)) {
      setError(true);
      setHelperText("Invalid email address");
    } else if (type === "password" && !passwordRegEx.test(value)) {
      setError(true);
      setHelperText(
        "Invalid password. Must be at least 8 characters long and include uppercase and lowercase letters, a digit, and a special character."
      );
    } else {
      setError(false);
      setHelperText("");
    }
  };

  return (
    <TextField
      fullWidth={fullWidth}
      variant="outlined"
      label={label}
      type={type}
      name={name}
      color={color}
      autoComplete={autoComplete}
      size={size}
      value={value}
      onChange={onChange}
      sx={{
        marginBottom: "1rem",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#0a3a40",
          },
          "&:hover fieldset": {
            borderColor: "#0c4c56",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#0a3a40",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#0a3a40",
        },
        ...sx,
      }}
      {...otherProps}
      onBlur={handleBlur}
      error={error}
      helperText={helperText}
    />
  );
};

export default CSInput;
