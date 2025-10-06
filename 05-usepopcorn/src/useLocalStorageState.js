import { useEffect, useState } from "react";

export function useLocalStorageState(inatialState, key) {
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : inatialState;
    });

    useEffect(function () {
        localStorage.setItem('watched', JSON.stringify(value))
    }, [value]);

    return [value, setValue];
}