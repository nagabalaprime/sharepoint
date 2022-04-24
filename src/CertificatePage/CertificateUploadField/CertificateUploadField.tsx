import React, { useEffect, useRef  , useState} from "react";

import { TextField } from "@fluentui/react/lib/TextField";
import { DefaultButton } from "@fluentui/react/lib/Button";

import { Text } from "@fluentui/react/lib/Text";
import { IIconProps, IconButton, initializeIcons } from "@fluentui/react";

import "./CertificateUploadField.css";

// import { CertificateUpload } from "../CertificateUpload/CertificateUpload";


interface IProps {
  fieldIndex: number;
  deleteCallback: Function;
  uploadFileCallback: Function
}

interface IPublicKey {
  e: BigInteger;
  n:BigInteger;
  encrypt : Function;
  verify:Function
  Buffer: any;
}
const CertificateUploadField: React.FC<IProps> = ({ fieldIndex  , deleteCallback , uploadFileCallback}) => {
  
  const deleteIcon: IIconProps = { iconName: "Delete" };
  // const [certificate, setCertificate] = useState<string | ArrayBuffer>('');
  
  const hiddenFileInput = useRef<React.RefObject<HTMLInputElement>>();

  const showFile = async (e : any) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e?.target?.result || '';
      // setCertificate(text);
      uploadFileCallback(text ,fieldIndex);
    };

    reader.readAsText(e.target.files[0]);
  };


  const uploadClick = () => {
    const fileInput =  hiddenFileInput?.current as unknown  as HTMLInputElement;
    fileInput.click();
  };

  const deleteRow = () => {
    deleteCallback(fieldIndex);
  };

  

  return (
    <div className="uploadFieldContainer">
      <Text className="uploadFieldComponent">
        {" "}Certificate {fieldIndex}
      </Text>
      <TextField
        className="uploadFieldComponent"
        placeholder="Select File here"
      />
      <input
        type="file"
        onChange={(e) => showFile(e)}
        ref={hiddenFileInput as unknown as React.RefObject<HTMLInputElement>}
        style={{ display: 'none' }}
      />
      <DefaultButton
        text="Browse"
        onClick={uploadClick}
        className="uploadFieldComponent"
      />
      <IconButton
        iconProps={deleteIcon}
        splitButtonAriaLabel="See 2 options"
        aria-roledescription="split button"
        ariaLabel="New item"
        onClick={deleteRow}
      />
    </div>
  );
};

export default CertificateUploadField;
