import React, { useState  , useEffect} from "react";
import { IIconProps, IconButton, initializeIcons, DefaultButton } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import CertificateUploadField from "./CertificateUploadField/CertificateUploadField";
import "./CertificatePage.css";
import {convertCertifcateToJWK} from '../utils/certificateUtils';

interface ICertificateDetail {
  id: number ,
  certificateValue: string,
  jswToken: {}
}

interface IJSW {
  kid: string ;
  kty:string;
  key_ops: string[];
  n:string;
  e:string;
  x5c: string;
  use:string;
  x5t:string;
  x5t256:string;
  alg:string;

}

const JSWToken =  {
  kid: '' ,
  kty:'',
  key_ops: [],
  n:'',
  e:'',
  x5c: '',
  use:'',
  x5t:'',
  x5t256:'',
  alg:'',

}

const CertificatePage = () => {
  const optionalCeritificateIntialID = 4;
  const [certificateDetailsList, setcertificateDetailsList] = 
          useState<ICertificateDetail[]>([{id:optionalCeritificateIntialID , certificateValue:'' , jswToken:{} } ]);

  const addIcon: IIconProps = { iconName: "Add" };

  initializeIcons();

  const addNewCerficateField = () => {
    const newCertificateID = (certificateDetailsList.length + optionalCeritificateIntialID  );
    setcertificateDetailsList([...certificateDetailsList, {id:newCertificateID , certificateValue:'' , jswToken:JSWToken}]);
  };

  const deleteRow = (index = optionalCeritificateIntialID) => {
     const filteredCertificate = certificateDetailsList.filter(item => item?.id !== index);
     setcertificateDetailsList([...filteredCertificate]);
  };

  const uploadedFile = (text = '' ,fieldIndex = optionalCeritificateIntialID)=>{


    // update certificate value when matching index found on list
    const updatedCertificateList = certificateDetailsList.map(certificateDetail =>
      certificateDetail?.id === fieldIndex
        ? { ...certificateDetail, certificateValue: text }
        : certificateDetail
    );

    setcertificateDetailsList([...updatedCertificateList]);

  }

  

  const convertToJWK = ()=>{
    certificateDetailsList.map(certificateDetail => {
      const JWKValue = convertCertifcateToJWK(certificateDetail?.certificateValue);
      certificateDetail['jswToken'] = JWKValue ;

      return certificateDetail
        });

        console.log('coverted certifidate details list ' , certificateDetailsList);
  
  }

  return (
    <div className="certificate-page">
      <Text variant={"large"}>Certificate optional</Text>
      {certificateDetailsList.map((certificateDetail, index) => {
        return (
          <CertificateUploadField
            fieldIndex={Number(certificateDetail?.id)}
            key={index}
            deleteCallback={deleteRow}
            uploadFileCallback={uploadedFile}
          />
        );
      })}

      <div onClick={addNewCerficateField} className="add-button">
        <IconButton
          iconProps={addIcon}
          splitButtonAriaLabel="See 2 options"
          aria-roledescription="split button"
          ariaLabel="New item"
        />
        <Text>Add </Text>
      </div>

      <DefaultButton
        text="Convert"
        onClick={convertToJWK}
        className="covert-button"
      />
    </div>
  );
};

export default CertificatePage;
