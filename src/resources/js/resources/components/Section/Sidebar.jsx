import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BASE_PATH } from "../../../constants";
import { general, sidebar as strings } from "../../../constants/strings/fa";
import { toggleSidebarAction } from "../../../state/layout/layoutActions";

const menuItems = {
    DASHBOARD: {
        page: "Dashboard",
        path: BASE_PATH,
        icon: "icon-category4",
        label: strings.dashboard,
    },
    ERRORS: {
        page: "Errors",
        path: `${BASE_PATH}/errors`,
        icon: "icon-category4",
        label: strings.errors,
    },
    USERS: {
        page: "Users",
        path: `${BASE_PATH}/users`,
        icon: "icon-personalcard",
        label: strings.users,
        pages: ["Posts"],
    },
    POSTS_V1: {
        page: "PostsV1",
        path: `${BASE_PATH}/posts/v1`,
        icon: "icon-document4",
        label: strings.postsV1,
    },
    POSTS_V2: {
        page: "PostsV2",
        path: `${BASE_PATH}/posts/v2`,
        icon: "icon-document4",
        label: strings.postsV2,
    },
    KEYWORDS: {
        page: "Keywords",
        path: `${BASE_PATH}/keywords`,
        icon: "icon-hashtag4",
        label: strings.keywords,
    },
};

function Sidebar() {
    const dispatch = useDispatch();
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);

    const toggleSidebar = () => {
        dispatch(toggleSidebarAction());
    };

    const renderMenuItem = (menuItem, badge = 0) => {
        const active =
            menuItem.page === pageState?.page ||
            menuItem.pages?.includes(pageState?.page)
                ? true
                : false;
        return (
            <li className={`${active ? "active" : ""}`}>
                <Link to={menuItem.path}>
                    <i className={menuItem.icon}></i>
                    <span>{menuItem.label}</span>
                    {badge > 0 && (
                        <div
                            className="dot"
                            style={{
                                display: "inline",
                                position: "relative",
                                right: "-40px",
                                top: "2px",
                            }}
                        >
                            <span className="bg-success"></span>
                        </div>
                    )}
                </Link>
            </li>
        );
    };

    const renderMainItems = () => (
        <>
            <div className="menu-title">{strings.mainItems}</div>
            <ul>
                {renderMenuItem(menuItems.DASHBOARD)}
                {renderMenuItem(menuItems.USERS)}
                {renderMenuItem(menuItems.POSTS_V1)}
                {renderMenuItem(menuItems.POSTS_V2)}
                {renderMenuItem(menuItems.KEYWORDS)}
                {renderMenuItem(menuItems.ERRORS)}
            </ul>
        </>
    );

    return (
        <div
            className={`sidebar ${
                layoutState?.sidebarCollapsed ? "active" : ""
            }`}
        >
            <div className="sidebar-hd d-flex align-start just-between">
                <div className="logo">
                    <h2 className="text">{general.brand}</h2>
                </div>
                <div className="closemenu" onClick={toggleSidebar}>
                    <i className="icon-arrow-right"></i>
                </div>
            </div>
            <div className="menu scrollhide">
                {renderMainItems()}
                <div className="menu-title">{strings.telSupport}</div>
                <ul>
                    <li className="pd-d-30">
                        <a href={`tel:${strings.tel}`}>
                            <i className="icon-call"></i>
                            <span className="tel">{strings.tel}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
