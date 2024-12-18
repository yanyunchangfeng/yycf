import { isVercel } from './isVercel';
import { isStatic } from './isStatic';

export const isDynamic = isVercel || !isStatic;
