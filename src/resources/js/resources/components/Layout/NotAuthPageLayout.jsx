import React from "react";

import BasePageLayout from "./BasePageLayout";

const NotAuthPageLayout = ({ children, pageUtils }) => {
  return (
    <BasePageLayout authPage={false} pageUtils={pageUtils}>
      {children}
    </BasePageLayout>
  );
};

export default NotAuthPageLayout;
