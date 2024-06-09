import React from "react";
import { useSelector } from "react-redux";

import { BlankPage, CustomLink } from "../../components";
import { PageUtils } from "./PageUtils";
import { dashboardPage as strings } from "../../../constants/strings/fa";
import utils from "../../../utils/Utils";

const Dashboard = () => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageUtils = new PageUtils();

    const renderUsers = () => (
        <div className="block pd-20 d-flex d-flex-column just-around align-center">
            <CustomLink
                href="#"
                onClick={pageUtils.onUsers}
                style={{ width: "100%", height: "100%", textAlign: "center" }}
            >
                <div>
                    <h3 className="text mb-30">{strings.users}</h3>
                    <p className="placeholder">
                        {strings.no}:{" "}
                        <span className="text">
                            {utils.addCommasPersianIfNum(
                                pageUtils?.pageState?.props?.usersCount ?? 0
                            )}
                        </span>
                    </p>
                </div>
            </CustomLink>
        </div>
    );

    const renderPosts = () => (
        <div className="block pd-20 d-flex d-flex-column just-around align-center">
            <h3 className="text mb-30">{strings.posts}</h3>
            <p>
                {strings.no}:{" "}
                <span className="text">
                    {utils.addCommasPersianIfNum(
                        pageUtils?.pageState?.props?.postsCount ?? 0
                    )}
                </span>
            </p>
        </div>
    );

    const renderHashtags = () => (
        <div className="block pd-20 d-flex d-flex-column just-around align-center">
            <h3 className="text mb-30">{strings.hashtags}</h3>
            <p>
                {strings.no}:{" "}
                <span className="text">
                    {utils.addCommasPersianIfNum(
                        pageUtils?.pageState?.props?.hashtagsCount ?? 0
                    )}
                </span>
            </p>
        </div>
    );

    const renderKeywords = () => (
        <div className="block pd-20 d-flex d-flex-column just-around align-center">
            <CustomLink
                href="#"
                onClick={pageUtils.onKeywords}
                style={{ width: "100%", height: "100%", textAlign: "center" }}
            >
                <h3 className="text mb-30">{strings.keywords}</h3>
                <p className="placeholder">
                    {strings.no}:{" "}
                    <span className="text">
                        {utils.addCommasPersianIfNum(
                            pageUtils?.pageState?.props?.keywordsCount ?? 0
                        )}
                    </span>
                </p>
            </CustomLink>
        </div>
    );

    return (
        <BlankPage pageUtils={pageUtils}>
            <div className="section d-flex-wrap fix-mr15">
                {renderUsers()}
                {renderPosts()}
                {renderHashtags()}
                {renderKeywords()}
            </div>
            <div className="section d-flex-wrap fix-mr15">
                <button
                    id="seedButton"
                    className="btn btn-primary mx-rdir-10"
                    type="button"
                    title={strings.seeding}
                    onClick={pageUtils.onSeed}
                    disabled={layoutState?.loading}
                >
                    {strings.seeding}
                </button>
            </div>
        </BlankPage>
    );
};

export default Dashboard;
