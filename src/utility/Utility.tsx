export const getFromLocalStorage = ({param}:any) => {
    try {
        return JSON.parse(localStorage.getItem(param) || '');
    } catch (error) {
        return null;
    }
};