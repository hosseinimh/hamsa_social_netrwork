import React from "react";
import { useSelector } from "react-redux";

import {
    InputRow,
    InputTextColumn,
    ListPage,
    SearchBox,
    TableFooter,
    TableItems,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { keywordsPage as strings } from "../../../../constants/strings/fa";

const Keywords = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 1;
    const pageUtils = new PageUtils();

    const renderSearch = () => (
        <SearchBox
            pageUtils={pageUtils}
            onSubmit={pageUtils.onSubmit}
            onReset={pageUtils.onReset}
        >
            <InputRow>
                <InputTextColumn field="keyword" fullRow={false} />
            </InputRow>
        </SearchBox>
    );

    const renderHeader = () => (
        <tr>
            <th>{strings.keyword}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <tr key={item.id}>
                <td>{item.keyword}</td>
            </tr>
        ));

        return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
    };

    const renderFooter = () => (
        <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
    );

    return (
        <ListPage
            pageUtils={pageUtils}
            table={{ renderHeader, renderItems, renderFooter }}
            hasAdd={false}
            renderTopList={renderSearch}
        ></ListPage>
    );
};

export default Keywords;
