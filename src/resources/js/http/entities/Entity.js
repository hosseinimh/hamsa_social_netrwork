import { get, post, postFile } from "../http";
import utils from "../../utils/Utils";
import { BASE_PATH } from "../../constants";
import { utils as strings, general } from "../../constants/strings/fa";

class Entity {
    constructor() {
        this.errorMessage = "";
        this.errorCode = 0;
    }

    async handleGet(url, data) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;
            const response = await get(url, data);

            return this.handleResponse(response);
        } catch (error) {
            console.error(error);

            if (error.message === "Network Error") {
                this.errorMessage = general.networkError;
            } else {
                this.errorMessage = error.message;
            }

            this.errorCode = 1000;

            return null;
        }
    }

    async handlePost(url, data = {}, withCredentials = true) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;
            const response = await post(url, data, withCredentials);
            return this.handleResponse(response);
        } catch (error) {
            if (error.response) {
                this.errorMessage = error.response.data;
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
                return null;
            } else if (error.request) {
                this.errorMessage = error.request;
                console.error(error.request);
                return null;
            }
            console.error(error);

            if (error.message === "Network Error") {
                this.errorMessage = general.networkError;
            } else {
                this.errorMessage = error.message;
            }

            this.errorCode = 1000;

            return null;
        }
    }

    async handlePostFile(url, data) {
        try {
            this.errorMessage = "";
            this.errorCode = 0;

            const response = await postFile(url, data);

            return this.handleResponse(response);
        } catch (error) {
            console.error(error);

            if (error.message === "Network Error") {
                this.errorMessage = general.networkError;
            } else {
                this.errorMessage = error.message;
            }

            this.errorCode = 1000;

            return null;
        }
    }

    handleResponse(response) {
        try {
            if (!utils.isJsonString(response.data)) {
                this.errorMessage = strings.notValidJson;

                return null;
            }

            if (response.data._result !== "1") {
                this.errorMessage = response.data._error;
                this.errorCode = response.data._errorCode;
                this.handleError();

                return null;
            }

            return response.data;
        } catch (error) {
            console.error(error);
            this.errorMessage = error.message;
            this.errorCode = 1000;

            return null;
        }
    }

    handleError() {
        switch (this.errorCode) {
            case 1:
            case 2:
                window.location.href = BASE_PATH;

                break;
            default:
                return;
        }
    }
}

export default Entity;
