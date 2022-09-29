import Me from './cursor/me';
import Other from './cursor/other';
declare const Latency: ({ cursor, showLatency, }: {
    cursor: Me | Other;
    showLatency: boolean;
}) => JSX.Element | null;
export default Latency;
