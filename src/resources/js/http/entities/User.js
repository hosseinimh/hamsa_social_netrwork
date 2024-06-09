import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class User extends Entity {
    constructor() {
        super();
    }

    async getPaginate(name, family, _pn = 1, _pi = PAGE_ITEMS) {
        return await this.handlePost(`${BASE_URL}/users`, {
            name,
            family,
            _pn,
            _pi,
        });
    }
}
