
const isValidUrl = (u: string) => {

    try {
        const newUrl = new URL(u);
        return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
    } catch (err) {
        return false;
    }
};

export { isValidUrl };