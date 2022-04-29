import React, { useState  , useEffect} from "react";
import { IIconProps, IconButton, initializeIcons, DefaultButton , PrimaryButton } from "@fluentui/react";
import { Text } from "@fluentui/react/lib/Text";
import CertificateUploadField from "./CertificateUploadField/CertificateUploadField";
import "./CertificatePage.css";
import {convertCertifcateToJWK, downloadJSON} from '../utils/certificateUtils';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { Dialog, DialogType, DialogFooter  , } from '@fluentui/react/lib/Dialog';

interface ICertificateDetail {
  id: number ,
  certificateValue: string,
  jswToken: {}
}



const CertificatePage = () => {
  const optionalCeritificateIntialID = 4;
  const [certificateDetailsList, setCertificateDetailsList] = 
          useState<ICertificateDetail[]>([
            { id:1 , certificateValue:'' , jswToken:{} } ,
            {id:2 , certificateValue:'' , jswToken:{} } ,
            { id:3 , certificateValue:'' , jswToken:{} } ,
            { id:optionalCeritificateIntialID , certificateValue:'' , jswToken:{} } ]);

  const addIcon: IIconProps = { iconName: "Add" };
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  initializeIcons();

  const addNewCerficateField = () => {
    const newCertificateID = (certificateDetailsList.length + 1  );
    setCertificateDetailsList([...certificateDetailsList, {id:newCertificateID , certificateValue:'' , jswToken:{}}]);
  };

  const deleteRow = (index = optionalCeritificateIntialID) => {
     const filteredCertificate = certificateDetailsList.filter(item => item?.id !== index);
     setCertificateDetailsList([...filteredCertificate]);
  };

  const uploadedFile = (text = '' ,fieldIndex = optionalCeritificateIntialID)=>{

    // update certificate value when matching index found on list
    const updatedCertificateList = certificateDetailsList.map(certificateDetail =>
      certificateDetail?.id === fieldIndex
        ? { ...certificateDetail, certificateValue: text }
        : certificateDetail
    );

    setCertificateDetailsList([...updatedCertificateList]);

  }

  

  const convertToJWK = ()=>{
    const convertedCertificate = certificateDetailsList.map(certificateDetail => {
      const JWKValue = convertCertifcateToJWK(certificateDetail?.certificateValue);
      certificateDetail['jswToken'] = JWKValue ;

      return certificateDetail;
        });

      setCertificateDetailsList([...convertedCertificate]);
      toggleHideDialog();
  
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

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Download security domain',
    closeButtonAriaLabel: 'Close',
    subText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sed quasi aspernatur, ratione aliquid ex, voluptate suscipit at assumenda inventore adipisci maiores placeat blanditiis sunt porro molestiae necessitatibus rem ullam?',
  }

  const dialogStyles = { main: { width: 600 } };

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [ labelId, subTextId],
  );

  const downloadFile =()=>{
    // replace json with response from service call
    const json = {name:'bala' , test:'test'};
    setTimeout(()=>{
      downloadJSON(json);
    },10000)
    
    toggleHideDialog();
  }
  
  

  const renderDialogBox = ()=>{
    return (<Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={downloadFile} text="Download" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    )
  }

  
  const mandatoryFieldCheck =()=>{
    return certificateDetailsList.reduce((certificateStatus , certificateDetail)=>{
      // filter out mandatory certificate on list first
      if(certificateDetail?.id < optionalCeritificateIntialID) {
            return certificateStatus && !!certificateDetail?.certificateValue;
      }
   return certificateStatus;
    }, true);
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

  

        {renderDialogBox()}
      </div>
      <DefaultButton
          text="Convert"
          onClick={convertToJWK}
          className="a"
          disabled={false}
        />
    </div>
  );
};

export default CertificatePage;
