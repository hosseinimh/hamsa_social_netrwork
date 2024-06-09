import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import { postsV1Page as strings } from "../../../../constants/strings/fa";

const PostsV1 = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 1;
    const pageUtils = new PageUtils();

    const renderHeader = () => (
        <tr>
            <th>{strings.text}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item, index) => (
            <tr key={index}>
                <td>{item.text}</td>
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
        ></ListPage>
    );
};

export default PostsV1;
