export const getDirection = (direction: number = -1) => {
    if (direction < 0) {
        return Math.floor(Math.random() * 10);
    } else {
        return -Math.floor(Math.random() * 10);
    }
}