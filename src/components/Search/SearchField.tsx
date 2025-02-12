import React from "react";
import { useEffect, useState } from "react";

import { TextField, TextFieldProps } from "@mui/material";

interface SearchFieldProps extends Omit<TextFieldProps, "onChange" | "value"> {
  value: string | number | null | undefined;
  onChange: (value: string) => void;
}

export default function SearchField({
  value,
  onChange,
  ...textFieldProps
}: SearchFieldProps) {
  const [localValue, setLocalValue] = useState<string>("");

  // Sync with external value
  useEffect(() => {
    setLocalValue(value?.toString() ?? "");
  }, [value]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (textFieldProps.onBlur) {
      textFieldProps.onBlur(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = e.currentTarget.querySelector("input");
      if (inputElement) {
        inputElement.blur();
      }
    }
    if (textFieldProps.onKeyDown) {
      textFieldProps.onKeyDown(e);
    }
  };

  return (
    <TextField
      {...textFieldProps}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      size="small"
      fullWidth
    />
  );
}
