import { useForm } from "react-hook-form";

import { Post as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, MESSAGE_TYPES } from "../../../../constants";
import { postsPage as strings } from "../../../../constants/strings/fa";
import { setPageTitleAction } from "../../../../state/page/pageActions";
import { setMessageAction } from "../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Posts", strings, form);
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
        this.navigateIfNotValidateParams();
        super.onLoad();
        this.fillForm(this.pageState.params);
    }

    onAction(props) {
        switch (props.action) {
            case "SET_PAGE":
                props.action = null;
                this.onSubmit({
                    userId: this.pageState?.params?.userId,
                });

                break;
        }

        super.onAction(props);
    }

    navigateIfNotValidateParams() {
        this.navigateIfNotValidId(this.pageState?.params?.userId);
    }

    async fillForm(data) {
        const promise = this.entity.getPaginate(
            data.userId,
            this.pageState.props?.pageNumber ?? 1
        );
        super.fillForm(promise);
    }

    propsIfOK(result) {
        try {
            this.dispatch(
                setPageTitleAction(
                    `${strings._title} [ ${result.user.name} ${result.user.family} ]`,
                    strings._subTitle
                )
            );
            return {
                items: result.items,
                user: result.user,
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
