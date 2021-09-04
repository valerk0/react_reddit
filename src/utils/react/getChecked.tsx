import { pickFromSyntheticEvent } from "./pickFromSyntheticEvent";

export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked');
