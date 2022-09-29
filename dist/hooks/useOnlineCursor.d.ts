import Me from '../cursor/me';
import Other from '../cursor/other';
declare const useOnlineCursor: ({ presenceURL, presenceAuthEndpoint, room, name, avatar, color, }: {
    presenceURL: string;
    presenceAuthEndpoint: string;
    room?: string | undefined;
    name?: string | undefined;
    avatar?: string | undefined;
    color?: string | undefined;
}) => {
    me: Me | null;
    others: Other[];
};
export default useOnlineCursor;
