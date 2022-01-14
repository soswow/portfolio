import { getProjectList } from "./data";

const LOCAL_STORAGE_KEY = 'sasha-makes.general.storage';

export interface StorageValue {
    seenProjectNames: string[];
}

const saveStorageValue = (storageValue: StorageValue) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storageValue));
}

const setNewStorageValue = () => {
    const firstStorageValue: StorageValue = {
        seenProjectNames: getProjectList().map(({ name }) => name),
    };
    saveStorageValue(firstStorageValue);
    return firstStorageValue;
}

export const loadStorageValue = () => {
    const storageValueStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageValueStr) {
        const storageValue: StorageValue = JSON.parse(storageValueStr);
        return storageValue;
    } else {
        return setNewStorageValue();
    }
}

export const markAsSeen = (projectName: string) => {
    const storageValue = loadStorageValue();
    if (storageValue.seenProjectNames.indexOf(projectName) === -1) {
        storageValue.seenProjectNames.push(projectName);
        saveStorageValue(storageValue);
    }
}