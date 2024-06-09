import { BASE_PATH } from "../../../constants";
import { dashboardPage as strings } from "../../../constants/strings/fa";
import { Dashboard as Entity } from "../../../http/entities";
import { setLoadingAction } from "../../../state/layout/layoutActions";
import { setPagePropsAction } from "../../../state/page/pageActions";
import { BasePageUtils } from "../../../utils/BasePageUtils";

export class PageUtils extends BasePageUtils {
    constructor(useForm) {
        super("Dashboard", strings, useForm);
        this.entity = new Entity();
        this.initialPageProps = {
            usersCount: 0,
            postsCount: 0,
            hashtagsCount: 0,
            keywordsCount: 0,
        };
        this.onUsers = this.onUsers.bind(this);
        this.onKeywords = this.onKeywords.bind(this);
        this.onSeed = this.onSeed.bind(this);
    }

    onLoad() {
        super.onLoad();
        this.dispatch(setPagePropsAction(this.initialPageProps));
        this.fillForm();
    }

    onUsers() {
        this.navigate(`${BASE_PATH}/users`);
    }

    onKeywords() {
        this.navigate(`${BASE_PATH}/keywords`);
    }

    async onSeed() {
        this.dispatch(setLoadingAction(true));
        const seedButton = document.querySelector("#seedButton");
        seedButton.textContent = strings.onSeeding;
        const result = await this.entity.seed();
        if (result !== null) {
            await this.fillForm();
        }
        seedButton.textContent = strings.seeding;
        this.dispatch(setLoadingAction(false));
    }

    async fillForm(data = null) {
        this.dispatch(setLoadingAction(true));
        await this.fetchData(data);
        this.dispatch(setLoadingAction(false));
    }

    async fetchData() {
        try {
            let result = await this.entity.get();
            this.handleFetchResult(
                result,
                this.propsIfOK(result),
                this.propsIfNull()
            );
        } catch {}
    }

    propsIfOK(result) {
        return {
            usersCount: result?.usersCount,
            postsCount: result?.postsCount,
            hashtagsCount: result?.hashtagsCount,
            keywordsCount: result?.keywordsCount,
        };
    }
}
