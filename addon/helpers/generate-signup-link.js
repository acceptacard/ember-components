import { helper } from '@ember/component/helper';
import ENV from 'partner-secure-operations-com/config/environment';

const PARTNER_TYPE_DIRECT = 'direct';

export function generateSignupLink([partnerId, partnerType, isIso, referralCode, isSales]) {
  let signupUrl = `${ENV.apiHost}/signup/quote?`;

  if(partnerId) {
      signupUrl += `partner=${partnerId}&`;
  }

    if(!isIso && partnerType == PARTNER_TYPE_DIRECT) {
        signupUrl += `merchant_type=${partnerType}&`;
    }

    if(referralCode) {
        signupUrl += `referral_code=${referralCode}&`;
    }

    if(isSales) {
        signupUrl += `registration_type=TS`;
    }


    if(['&', '?'].includes(signupUrl.substr(-1))) {
      signupUrl = signupUrl.substr(0, signupUrl.length - 1);
    }

  return signupUrl;
}

export default helper(generateSignupLink);
