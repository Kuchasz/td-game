export const getRandomColor = () => {
    const _colors = [0xe1b178, 0xe5cfb1, 0xf6d5dc, 0x9a5564, 0x571e27, 0xFF6666, 0x57FFA2, 0xB2FF4D, 0x7D4296, 0xFFA142];
    return _colors[Math.floor(Math.random() * _colors.length)];
};
