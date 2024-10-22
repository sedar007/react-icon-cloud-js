const s = () => {
    const array = new Uint16Array(1);
    window.crypto.getRandomValues(array);
    return array[0].toString(16).padStart(4, '0');
};

export const guid = () => `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`;
