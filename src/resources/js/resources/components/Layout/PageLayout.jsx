import React from "react";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";

const PageLayout = ({ children, pageUtils }) => {
  return (
    <BasePageLayout pageUtils={pageUtils}>
      <AlertState />
      {children}
    </BasePageLayout>
  );
};

export default PageLayout;
