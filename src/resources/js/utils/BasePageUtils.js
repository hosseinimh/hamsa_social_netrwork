import { useSelector } from "react-redux";

import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../constants";
import { setLoadingAction } from "../state/layout/layoutActions";
import {
    clearMessageAction,
    setMessageAction,
} from "../state/message/messageActions";
import { setPagePropsAction } from "../state/page/pageActions";
import utils from "./Utils";
import { general } from "../constants/strings/fa";

export class BasePageUtils {
    constructor(name, strings = {}, useForm = null) {
        this.name = name;
        this.strings = strings;
        this.useForm = useForm;
        this.initialPageProps = {};
        this.callbackUrl = BASE_PATH;
        this.messageField = null;
        this.layoutState = useSelector((state) => state.layoutReducer);
        this.pageState = useSelector((state) => state.pageReducer);
        this.userState = useSelector((state) => state.userReducer);
        this.dispatch = this.pageState.dispatch;
        this.navigate = this.pageState.navigate;
        this.onAdd = this.onAdd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    onLoad() {
        this.dispatch(setPagePropsAction(this.initialPageProps));
    }

    async fillForm(promise) {
        this.dispatch(setLoadingAction(true));
        const result = await promise;
        this.handleFetchResult(
            result,
            this.propsIfOK(result),
            this.propsIfNull()
        );
    }

    onSendRequest() {
        this.messageField = null;
        this.dispatch(setLoadingAction(true));
        this.dispatch(clearMessageAction());
    }

    handleFetchResult(result, propsIfOK, propsIfNull) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleFetchResultIfNull(propsIfNull);
        } else {
            this.handleFetchResultIfOK(propsIfOK);
        }
    }

    handleCustomFetchResult(
        result,
        handleFetchResultIfOK = null,
        handleFetchResultIfNull = null
    ) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            typeof handleFetchResultIfNull === "function"
                ? handleFetchResultIfNull(this.propsIfNull())
                : this.handleFetchResultIfNull(this.propsIfNull());
        } else {
            typeof handleFetchResultIfOK === "function"
                ? handleFetchResultIfOK(this.propsIfOK(result))
                : this.handleFetchResultIfOK(this.propsIfOK(result));
        }
    }

    handleFetchResultIfNull(props) {
        this.dispatch(setPagePropsAction(props));
        this.dispatch(
            setMessageAction(
                this.entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                this.entity.errorCode
            )
        );
    }

    handleFetchResultIfOK(props) {
        this.dispatch(setPagePropsAction(props));
    }

    handleFetchResultWithCallback(result, ok, propsIfNull) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleFetchResultIfNull(propsIfNull);
        } else {
            ok();
        }
    }

    propsIfOK(result) {
        try {
            return {
                items: result.items,
                itemsCount: result.count,
            };
        } catch {}
    }

    propsIfNull() {
        return this.initialPageProps;
    }

    handleModifyResult(result) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleModifyResultIfNull();
            return false;
        } else {
            this.handleModifyResultIfOK();
            return true;
        }
    }

    handleModifyResultIfNull() {
        this.dispatch(
            setMessageAction(
                this.entity.errorMessage,
                MESSAGE_TYPES.ERROR,
                this.entity.errorCode,
                true,
                this.messageField
            )
        );

        return;
    }

    handleModifyResultIfOK() {
        this.dispatch(
            setMessageAction(
                this.strings.submitted,
                MESSAGE_TYPES.SUCCESS,
                MESSAGE_CODES.OK
            )
        );
    }

    handleModifyResultAndNavigate(result) {
        this.dispatch(setLoadingAction(false));
        if (result === null) {
            this.handleModifyResultIfNull();
            return false;
        } else {
            this.handleModifyResultAndNavigateIfOK();
            return true;
        }
    }

    handleModifyResultAndNavigateIfOK() {
        this.dispatch(
            setMessageAction(
                this.strings.submitted,
                MESSAGE_TYPES.SUCCESS,
                MESSAGE_CODES.OK,
                false
            )
        );
        this.navigate(this.callbackUrl);
    }

    navigateIfNotValidId(id) {
        if (!utils.isId(id)) {
            this.dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            this.navigate(this.callbackUrl);
        }
    }

    navigateIfItemNotFound(result) {
        if (result === null) {
            this.dispatch(
                setMessageAction(
                    general.itemNotFound,
                    MESSAGE_TYPES.ERROR,
                    MESSAGE_CODES.ITEM_NOT_FOUND,
                    false
                )
            );
            this.navigate(this.callbackUrl);

            throw new Error();
        }
    }

    showErrorAndNavigate(message) {
        this.dispatch(
            setMessageAction(
                message,
                MESSAGE_TYPES.ERROR,
                MESSAGE_CODES.CLIENT_ERROR,
                false
            )
        );
        this.navigate(this.callbackUrl);

        throw new Error();
    }

    onAction(props) {
        switch (props.action) {
            case "SET_PAGE":
                this.onSubmit();

                break;
            case "ADD":
                this.addAction();

                break;
            case "EDIT":
                this.editAction(props.item);

                break;
            case "VIEW":
                this.viewAction(props.item);

                break;
            case "SET_FILE":
                this.useForm?.setValue("file", props.file);
                break;
        }

        this.dispatch(setPagePropsAction({ action: null }));
    }

    setPage(page) {
        this.dispatch(
            setPagePropsAction({ action: "SET_PAGE", pageNumber: page })
        );
    }

    onAdd() {
        this.dispatch(setPagePropsAction({ action: "ADD" }));
    }

    onEdit(item) {
        this.dispatch(
            setPagePropsAction({
                action: "EDIT",
                item,
            })
        );
    }

    onSetFile(file) {
        this.dispatch(
            setPagePropsAction({
                action: "SET_FILE",
                file,
            })
        );
    }

    async onModifySubmit(promise) {
        this.onSendRequest();
        const result = await promise;
        return this.handleModifyResultAndNavigate(result);
    }

    async onSelfSubmit(promise, data = null) {
        this.onSendRequest();
        const result = await promise;
        this.handleModifyResult(result);
        this.fillForm(data);
    }

    onSubmit(data = null) {
        this.onSendRequest();
        this.fillForm(data);
    }

    onReset() {
        this.useForm.reset();
        this.dispatch(
            setPagePropsAction({ action: "SET_PAGE", pageNumber: 1 })
        );
    }

    onCancel() {
        this.navigate(this.callbackUrl);
    }
}
