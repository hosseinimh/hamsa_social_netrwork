import React from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";

import { BASE_PATH } from "../../constants";
import * as Pages from "../Pages";

const renderRoutes = () => (
    <>
        <Route path={`${BASE_PATH}/users`} element={<Pages.Users />} />
        <Route path={`${BASE_PATH}/posts/v1`} element={<Pages.PostsV1 />} />
        <Route path={`${BASE_PATH}/posts/v2`} element={<Pages.PostsV2 />} />
        <Route path={`${BASE_PATH}/posts/:userId`} element={<Pages.Posts />} />
        <Route path={`${BASE_PATH}/errors`} element={<Pages.Errors />} />
        <Route path={`${BASE_PATH}/keywords`} element={<Pages.Keywords />} />
        <Route path={`${BASE_PATH}`} element={<Pages.Dashboard />} />
        <Route path="*" element={<Navigate to={BASE_PATH} />} />
    </>
);

function AppRoutes() {
    return (
        <Router>
            <Routes>{renderRoutes()}</Routes>
        </Router>
    );
}

export default AppRoutes;
