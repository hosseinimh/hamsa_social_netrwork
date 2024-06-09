import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import { IMAGES_PATH, THEMES } from "../../../constants";
import CustomLink from "../Link/CustomLink";
import {
    toggleSidebarAction,
    setDropDownElementAction,
    setThemeAction,
    setShownModalAction,
} from "../../../state/layout/layoutActions";
import { header as strings } from "../../../constants/strings/fa";
import ProfileModal from "../Modal/ProfileModal";

const Header = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const userState = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const toggleSidebar = () => {
        dispatch(toggleSidebarAction());
    };

    const showProfileModal = (e) => {
        e.stopPropagation();
        dispatch(setShownModalAction("profileModal"));
    };

    const toggleUserMenu = (e) => {
        e.stopPropagation();
        const element = document.querySelector("#user-menu").lastChild;
        if (layoutState?.dropDownElement) {
            slideUp(layoutState.dropDownElement);
            if (layoutState?.dropDownElement === element) {
                dispatch(setDropDownElementAction(null));
                return;
            }
        }
        dispatch(setDropDownElementAction(element));
        slideDown(element, {
            duration: 400,
            easing: easeOutQuint,
        });
    };

    const renderUserDropdown = () => (
        <div className="userinfo sub dropdown-link" id="user-menu">
            <div
                className="d-flex align-center"
                onClick={(e) => toggleUserMenu(e)}
            >
                <div className="img">
                    <img
                        src={
                            userState?.user?.avatar
                                ? `${userState?.user?.avatar}`
                                : `${IMAGES_PATH}/avatar-user.png`
                        }
                        alt=""
                    />
                </div>
                <div className="info">
                    <div className="name">محمود حسینی</div>
                    <div className="userid">hosseinimh</div>
                </div>
            </div>
            <div className="submenu dropdown-list">
                <ul>
                    <li>
                        <CustomLink onClick={(e) => showProfileModal(e)}>
                            <i className="icon-personalcard"></i>
                            <span className="mx-10">{strings.profile}</span>
                        </CustomLink>
                    </li>
                </ul>
            </div>
        </div>
    );

    const renderToggleTheme = () => (
        <div
            className={`item dark-toggle ${
                layoutState?.theme?.name === THEMES.LIGHT ? "active" : ""
            }`}
            onClick={toggleTheme}
        >
            <i className="icon-sun-1"></i>
        </div>
    );

    const toggleTheme = () => {
        if (layoutState?.theme?.name === THEMES.LIGHT) {
            dispatch(setThemeAction(THEMES.DARK));
        } else {
            dispatch(setThemeAction(THEMES.LIGHT));
        }
    };

    return (
        <div className="navbar d-flex align-center">
            <div className="menu-toggle" onClick={toggleSidebar}>
                <i className="icon-category4"></i>
            </div>
            {renderUserDropdown()}
            <div className="navbar-actions">
                <ProfileModal />
                {renderToggleTheme()}
            </div>
        </div>
    );
};

export default Header;
