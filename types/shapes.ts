export interface ShapeLayout {
    rows: number;
    cols: number;
    spacing: number;
    fileName: string;
}

export interface GasketDimensions extends ShapeLayout {
    insideDiammeter: number;
    outsideDiammeter: number;
}