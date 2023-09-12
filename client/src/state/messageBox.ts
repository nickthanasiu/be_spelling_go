import { atom } from "recoil";
import { MessageBoxAtom } from "./types";

export const messageBoxAtom = atom<MessageBoxAtom>({
    key: 'messageBoxAtom',
    default: {
        visible: false,
        message: '',
        isError: false,
        isPangram: false,
    }
});