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
import {
    general,
    usersPage as strings,
} from "../../../../constants/strings/fa";

const Users = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 2;
    const pageUtils = new PageUtils();

    const renderSearch = () => (
        <SearchBox
            pageUtils={pageUtils}
            onSubmit={pageUtils.onSubmit}
            onReset={pageUtils.onReset}
        >
            <InputRow>
                <InputTextColumn
                    field="name"
                    icon={"icon-personalcard4"}
                    fullRow={false}
                />
                <InputTextColumn
                    field="family"
                    icon={"icon-personalcard4"}
                    fullRow={false}
                />
            </InputRow>
        </SearchBox>
    );

    const renderHeader = () => (
        <tr>
            <th>{strings.nameFamily}</th>
            <th style={{ width: "100px" }}>{general.actions}</th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item) => (
            <tr key={item.id}>
                <td>{`${item.name} ${item.family}`}</td>

                <td>
                    <button
                        className="btn btn-primary mx-rdir-10"
                        type="button"
                        title={pageUtils.strings.add}
                        onClick={() => pageUtils.onPosts(item)}
                        disabled={layoutState?.loading}
                    >
                        {strings.posts}
                    </button>
                </td>
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

export default Users;
