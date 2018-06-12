import {helper} from '@ember/component/helper';
import numeral from 'numeral';

export function toNumeral([value, format = null]) {
    if (format !== null) {
        return numeral(value).format(format);
    }

    return numeral(value).value();
}

export default helper(toNumeral);
