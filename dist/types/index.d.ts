export declare type CursorMessage = {
    id: string;
    x: number;
    y: number;
    name?: string;
    avatar?: string;
    color: string;
};
export declare type MovementMessage = {
    id: string;
    x: number;
    y: number;
};
export declare type TextMessage = {
    id: string;
    message: string;
};
export declare type OfflineMessage = {
    id: string;
};
export declare type MousePosition = {
    mouseX: number;
    mouseY: number;
};
export declare type Latency = {
    id: string;
    meshId: string;
    latency: number;
};
