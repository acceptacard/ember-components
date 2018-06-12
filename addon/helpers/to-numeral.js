import {helper} from '@ember/component/helper';
import numeral from 'numeral';
import 'numeral/en-gb';

export function toNumeral([value, format = null]) {
    numeral.locale('en-gb');

    if (format !== null) {
        return numeral(value).format(format);
    }

    return numeral(value).value();
}

export default helper(toNumeral);
