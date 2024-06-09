import serverConfig from "../../../server-config.json";
import { MESSAGE_TYPES } from "./messageTypes";
import { MESSAGE_CODES } from "./messageCodes";
import { UPLOADED_FILE } from "./UploadedFile";
import { USER_ROLES } from "./userRoles";
import { MODAL_RESULT } from "./modalResult";
import {
    BASE_PATH,
    ASSETS_PATH,
    IMAGES_PATH,
    STORAGE_PATH,
    PAGE_ITEMS,
    THEMES,
    themes,
} from "./theme";

const BASE_URL = serverConfig.baseUrl;

export {
    BASE_URL,
    BASE_PATH,
    ASSETS_PATH,
    IMAGES_PATH,
    STORAGE_PATH,
    PAGE_ITEMS,
    THEMES,
    themes,
    MESSAGE_TYPES,
    MESSAGE_CODES,
    UPLOADED_FILE,
    USER_ROLES,
    MODAL_RESULT,
};
