import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Keyword extends Entity {
    constructor() {
        super();
    }

    async getPaginate(keyword, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/keywords`, {
            keyword,
            _pn,
            _pi,
        });
    }
}
