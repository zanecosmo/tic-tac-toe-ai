export type Row = [string | null, string | null, string | null];
export type BoardState = [Row, Row, Row];

export enum Symbols {
    X = "X",
    O = "O"
};

export interface Move {
    row: number;
    column: number;
};





