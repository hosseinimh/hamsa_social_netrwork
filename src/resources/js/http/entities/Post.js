import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Post extends Entity {
    constructor() {
        super();
    }

    async getPaginate(userId, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/posts/${userId}`, {
            _pn,
            _pi,
        });
    }

    async getHighlightedV1(_pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/posts/v1`, {
            _pn,
            _pi,
        });
    }

    async getHighlightedV2(_pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/posts/v2`, {
            _pn,
            _pi,
        });
    }
}
