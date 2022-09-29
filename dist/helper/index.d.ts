export declare const uuidv4: () => string;
export declare const getViewportSize: () => any;
export declare const getScale: (x: number, y: number) => {
    scaleX: number;
    scaleY: number;
};
export declare const getMousePosition: (scaleX: number, scaleY: number) => {
    mouseX: number;
    mouseY: number;
};
export declare const stringToColor: (str: string) => string;
