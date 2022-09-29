import { RefObject } from 'react';
import Other from '../cursor/other';
import Me from '../cursor/me';
declare const useRenderPosition: (cursor: Me | Other, refContainer?: RefObject<HTMLDivElement> | undefined) => RefObject<HTMLDivElement>;
export default useRenderPosition;
