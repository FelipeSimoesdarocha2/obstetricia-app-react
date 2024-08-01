import React, { useRef } from "react";

import MuiButton from "@mui/material/Button";

interface iProps {
  variant?: "text" | "outlined" | "contained";
  color?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: any[]) => void;
}

const FileUpload: React.FC<iProps> = ({
  children,
  variant,
  color,
  accept,
  multiple,
  onChange,
}) => {
  const refInput = useRef<any>(null);

  const openFileExplorer = () => {
    refInput?.current?.click();
  };

  const handleOnChangeFile = (event: any) => {
    if (onChange) {
      onChange(event.target.files);
    }
  };

  return (
    <>
      <input
        ref={refInput}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleOnChangeFile}
      />
      <MuiButton variant={variant} sx={{ color }} onClick={openFileExplorer}>
        {children}
      </MuiButton>
    </>
  );
};

FileUpload.defaultProps = {
  variant: "text",
  color: "#3E6C75",
  accept: "",
  multiple: false,
  onChange: () => {},
};

export default FileUpload;
