import Presence from '@yomo/presencejs';
import { Latency, MousePosition } from '../types';
export default class Cursor {
    id: string;
    x: number;
    y: number;
    name: string;
    avatar: string;
    color: string;
    constructor(id: string, x: number, y: number, name: string, avatar: string, color: string);
    move(x: number, y: number): void;
    onMove(_mousePosition: MousePosition): void;
    onGetLatency(_data: Latency): void;
    subscribeLatency(yomo: Presence): import("rxjs").Subscription;
}
