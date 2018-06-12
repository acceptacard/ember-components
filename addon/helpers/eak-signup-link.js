import {helper} from '@ember/component/helper';
import ENV from 'partner-secure-operations-com/config/environment';

const ACQUIRER_ELAVON_URL_CODE = 'a4';
const MERCHANT_TYPE_MICRO = 'micro';
const BLACK_CAB_PARTNERS = [
    'BLACKCABBUYCP', 'BLACKCABCP', 'BLACKCABMONTHLYCP', 'BLACKCABTFLBUYCP', 'BLACKCABTFLCP', 'BLACKCABTFLMONTHLYCP',
    'BLKCABMONTHLYLOWCP', 'BLKCABTFLMTHLOWCP', 'PAYATAXICPS'
];

export function eakSignupLink([eak, partner, merchantType = MERCHANT_TYPE_MICRO, isSales = false, isIso = false]) {
    let signupUrl = `${ENV.apiHost}/signup/`;

    if (isIso) {
        signupUrl += `${ACQUIRER_ELAVON_URL_CODE}/`;
    }

    if (BLACK_CAB_PARTNERS.includes(partner)) {
        signupUrl += 'bc/';
    }

    signupUrl += `start?eak=${eak}&partner=${partner}&`;

    if (isIso) {
        signupUrl += `application_type=iso&origin=PCS&`;
    } else {
        signupUrl += `application_type=submerchant&origin=PCS&merchant_type=${merchantType}&`;
    }

    if (isSales) {
        signupUrl += `registration_type=TS`;
    }

    if (['&', '?'].includes(signupUrl.substr(-1))) {
        signupUrl = signupUrl.substr(0, signupUrl.length - 1);
    }

    return signupUrl;
}

export default helper(eakSignupLink);
