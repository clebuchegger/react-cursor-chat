import Presence from '@yomo/presencejs';
import Cursor from './cursor';
export default class Other extends Cursor {
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
    unsubscribe(): void;
    onTextMessage(_message: string): void;
    private subscribeTextMessage;
    private subscribeMovement;
    private subscribeLeave;
    private subscribeEnter;
    onLeave(): void;
    onEnter(): void;
}
