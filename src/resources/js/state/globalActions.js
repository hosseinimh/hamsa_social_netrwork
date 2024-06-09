export const handleError = (data) => {
    try {
        console.error(data._result);
        return;
    } catch (error) {}

    return;
};
