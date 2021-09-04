import { pickFromSyntheticEvent } from "./pickFromSyntheticEvent";

export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value');
