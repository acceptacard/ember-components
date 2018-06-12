import { helper } from '@ember/component/helper';
import {getCountryFromCode} from 'partner-secure-operations-com/modules/country';

const COUNTRY_OPTIONS_ELAVON = 'elavon';

export function countryFromCode([code, countryOptions = COUNTRY_OPTIONS_ELAVON]) {
    return getCountryFromCode(code, countryOptions);
}

export default helper(countryFromCode);
