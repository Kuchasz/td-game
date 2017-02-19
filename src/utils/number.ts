export const range = (number: number, min: number, max: number) => {
    if (number > max) return max;
    if (number < min) return min;
    return number;
}