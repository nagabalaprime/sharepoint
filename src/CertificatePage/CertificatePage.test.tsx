import React from "react";
import { render, screen } from "@testing-library/react";
import CertificatePage from "./CertificatePage";

describe("certiificate page test cases", () => {
  const { getAllByText } = render(<CertificatePage />);
  it("check header Text ", () => {
    const header = getAllByText("Activate Managed HSM");
    expect(header).toBeTruthy();
  });
  it("check section title" , ()=>{
    const requiredSection = getAllByText("Required Certificates");
    const optionalSection = getAllByText("Certificate optional");
    expect(requiredSection).toBeTruthy();
    expect(optionalSection).toBeTruthy();
  });
  it("check add action" , ()=>{
    const addAction = getAllByText("Add");
    expect(addAction).toBeTruthy();
  })
});
