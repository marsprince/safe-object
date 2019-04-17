import {safeObject} from './index'

const mm: any = {};

const safe = safeObject(mm);
safe.x.y.z = 1
console.log(safe)
