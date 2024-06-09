import { useForm } from "react-hook-form";

import { Post as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_TYPES } from "../../../../constants";
import { postsV2Page as strings } from "../../../../constants/strings/fa";
import { setPageTitleAction } from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("PostsV2", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            item: null,
            items: null,
            action: null,
        };
        this.callbackUrl = `${BASE_PATH}/users`;
    }

    onLoad() {
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    async fillForm() {
        const promise = this.entity.getHighlightedV2(
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    propsIfOK(result) {
        try {
            this.dispatch(
                setPageTitleAction(strings._title, strings._subTitle)
            );
            return {
                items: result.items,
                itemsCount: result.count,
            };
        } catch {}
    }

    handleFetchResultIfNull() {
        this.dispatch(
            setMessageAction(
                this.entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                this.entity.errorCode,
                false
            )
        );
        this.navigate(this.callbackUrl);
    }
}
