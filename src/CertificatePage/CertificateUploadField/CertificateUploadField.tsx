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
  
  const hiddenFileInput = useRef<React.RefObject<HTMLInputElement>>();
  const [fileName, setFileName] = useState('');

  const handleChange = async (event : any) => {
    event.preventDefault();
    setFileName(event?.target?.files[0]?.name);
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event?.target?.result || '';
      // setCertificate(text);
      uploadFileCallback(text ,fieldIndex);
    };

    reader.readAsText(event.target.files[0]);
  };


  const uploadClick = () => {
    const fileInput =  hiddenFileInput?.current as unknown  as HTMLInputElement;
    fileInput.click();
  };

  const deleteRow = () => {
    deleteCallback(fieldIndex);
  };

  const renderDeleteButton = ()=>{

    if(fieldIndex >= 4) {
     return <IconButton
      iconProps={deleteIcon}
      splitButtonAriaLabel="See 2 options"
      aria-roledescription="split button"
      ariaLabel="New item"
      onClick={deleteRow}
    />
    }

    return null;
   
  }

  const renderLabelText = ()=>{
    return <Text className={fieldIndex < 4  ? "mandatoryLabelText" : "optionalCertificateLabelText"}>
        Certificate {fieldIndex} {fieldIndex < 4 && <span style={{color:'red'}}>{"*"}</span>} 
      </Text>
  }

  return (
    <div className="uploadFieldContainer">
      {renderLabelText()}
      <TextField
        className="uploadFieldComponent"
        placeholder="Select File here"
        value={fileName}
      />
      <input
        type="file"
        onChange={(e) => handleChange(e)}
        ref={hiddenFileInput as unknown as React.RefObject<HTMLInputElement>}
        style={{ display: 'none' }}
      />
      <DefaultButton
        text="Browse"
        onClick={uploadClick}
        className="uploadFieldComponent"
      />
      {renderDeleteButton()}
    </div>
  );
};

export default CertificateUploadField;
