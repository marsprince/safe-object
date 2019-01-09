import { SafeObject } from './index';

interface IY {
  z?: string
}

interface Itest {
  y?: IY
}


const mm: Itest = {};

const test = new SafeObject(mm);

test.set(2,'y','z')
console.log(mm)
