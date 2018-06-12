import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';
import { DEFAULT_DATE_TIME_FORMAT, MYSQL_DATE_TIME_FORMAT } from 'partner-secure-operations-com/modules/datetime';
import moment from 'moment';

export function mysqlToUkDateTime(params) {
    if(isPresent(params[0])) {
        return moment(params[0], MYSQL_DATE_TIME_FORMAT).format(DEFAULT_DATE_TIME_FORMAT);
    }
}

export default helper(mysqlToUkDateTime);
