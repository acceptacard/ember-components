import {helper} from '@ember/component/helper';

const YES = 'YES';
const NO = 'NO';

export function yesNo(params) {
    if (params[0]) {
        return YES;
    } else {
        return NO;
    }
}

export default helper(yesNo);
