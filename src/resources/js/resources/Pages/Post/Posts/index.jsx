import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import { PageUtils } from "./PageUtils";
import { postsPage as strings } from "../../../../constants/strings/fa";
import { BASE_PATH } from "../../../../constants";

const Posts = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 1;
    const pageUtils = new PageUtils();

    const renderHeader = () => (
        <tr>
            <th>{strings.text}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <React.Fragment key={item.id}>
                <tr>
                    <td>{item.text}</td>
                </tr>
                <tr>
                    <td>
                        <h4>{strings.hashtags}: </h4>
                        {item?.hashtags?.map((hashtag) => {
                            return `#${hashtag.hashtag} `;
                        })}
                    </td>
                </tr>
            </React.Fragment>
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
            backUrl={`${BASE_PATH}/users`}
        ></ListPage>
    );
};

export default Posts;
