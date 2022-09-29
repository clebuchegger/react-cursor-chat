import Presence from '@yomo/presencejs';
import Cursor from './cursor';
export default class Me extends Cursor {
    private yomo;
    private subscription;
    constructor({ id, x, y, name, avatar, color, }: {
        id: string;
        x: number;
        y: number;
        name?: string;
        avatar?: string;
        color: string;
    });
    goOnline(yomo: Presence): void;
    goOffline(): Promise<unknown>;
    sendMessage(message: string): void;
    private online;
    private subscribeOnline;
    private subscribeMousemove;
    private subscribeMousePosition;
    private subscribeVisibility;
}
