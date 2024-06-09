import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Error extends Entity {
    constructor() {
        super();
    }

    async getPaginate(_pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/errors`, {
            _pn,
            _pi,
        });
    }

    async store(error, errorInfo) {
        return await this.handlePost(`${BASE_URL}/errors/store`, {
            error,
            error_info: errorInfo,
        });
    }
}
