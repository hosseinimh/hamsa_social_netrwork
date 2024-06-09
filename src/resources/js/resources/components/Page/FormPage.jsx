import React from "react";
import { FormCard, FormPageLayout } from "../";

const FormPage = ({
  children,
  pageUtils,
  submitEnabled = true,
  renderBefore = null,
}) => {
  return (
    <FormPageLayout pageUtils={pageUtils} renderBefore={renderBefore}>
      <FormCard pageUtils={pageUtils} submitEnabled={submitEnabled}>
        {children}
      </FormCard>
    </FormPageLayout>
  );
};

export default FormPage;
