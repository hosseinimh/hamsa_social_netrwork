import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Dashboard extends Entity {
    constructor() {
        super();
    }

    async get() {
        return await this.handlePost(`${BASE_URL}/dashboard`);
    }

    async seed() {
        return await this.handlePost(`${BASE_URL}/dashboard/seed`);
    }
}
