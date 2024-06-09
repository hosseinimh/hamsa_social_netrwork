import React from "react";

import { PageLayout } from "../";

const BlankPage = ({ pageUtils, children }) => {
    return <PageLayout pageUtils={pageUtils}>{children}</PageLayout>;
};

export default BlankPage;
