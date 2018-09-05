import { Currency } from "../enums";

export type Balance = { [key in Currency]: number };
