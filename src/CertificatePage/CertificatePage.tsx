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



const CertificatePage = () => {
  const optionalCeritificateIntialID = 4;
  const [certificateDetailsList, setcertificateDetailsList] = 
          useState<ICertificateDetail[]>([
            { id:1 , certificateValue:'' , jswToken:{} } ,
            {id:2 , certificateValue:'' , jswToken:{} } ,
            { id:3 , certificateValue:'' , jswToken:{} } ,
            { id:optionalCeritificateIntialID , certificateValue:'' , jswToken:{} } ]);

  const addIcon: IIconProps = { iconName: "Add" };

  initializeIcons();

  const addNewCerficateField = () => {
    const newCertificateID = (certificateDetailsList.length + 1  );
    setcertificateDetailsList([...certificateDetailsList, {id:newCertificateID , certificateValue:'' , jswToken:{}}]);
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
    const convertedCertificate = certificateDetailsList.map(certificateDetail => {
      const JWKValue = convertCertifcateToJWK(certificateDetail?.certificateValue);
      certificateDetail['jswToken'] = JWKValue ;

      return certificateDetail
        });

      setcertificateDetailsList([...convertedCertificate])
  
  }
  const renderRequriedCertificates = ()=>{
    return(<div>
        <Text variant={"large"}>Required Certificates</Text>
        {certificateDetailsList.map((certificateDetail, index) => {
          if(certificateDetail?.id <  4){
                return (
                  <CertificateUploadField
                  fieldIndex={Number(certificateDetail?.id)}
                  key={index}
                  deleteCallback={deleteRow}
                  uploadFileCallback={uploadedFile}
                  />);
                  }
                }
          )}
    </div>)
  }

  const renderOptionalCertificates = ()=>{
  return ( <div>
      <Text variant={"large"}>Certificate optional</Text>
      {certificateDetailsList.map((certificateDetail, index) => {
      if(certificateDetail?.id >  3){
            return (
              <CertificateUploadField
              fieldIndex={Number(certificateDetail?.id)}
              key={index}
              deleteCallback={deleteRow}
              uploadFileCallback={uploadedFile}
              />);
              }
            }
          )}
      </div>
      )
  } 

  const renderAddButton = ()=> {
    return  <div onClick={addNewCerficateField} className="add-button">
    <IconButton
      iconProps={addIcon}
      splitButtonAriaLabel="See 2 options"
      aria-roledescription="split button"
      ariaLabel="New item"
    />
    <Text>Add </Text>
  </div>
  }

  return (
    <div className="certificate-page">
      <Text variant="xLarge" style={{fontSize: '30px'}}> Activate Managed HSM </Text>
      <div className="certificate-container">
      <div >
       <Text className="page-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est impedit placeat magni distinctio porro iste enim esse, amet exercitationem quidem. Sequi laborum, libero pariatur tenetur rerum consequuntur sed aliquam facere.</Text>
     
       <Text className="page-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est impedit placeat magni distinctio porro iste enim esse, amet exercitationem quidem. Sequi laborum, libero pariatur tenetur rerum consequuntur sed aliquam facere.</Text>
       </div>
        {renderRequriedCertificates()}
        {renderOptionalCertificates()}

        {renderAddButton()}

      <DefaultButton
        text="Convert"
        onClick={convertToJWK}
        className="covert-button"
      />
      </div>
    </div>
  );
};

export default CertificatePage;
