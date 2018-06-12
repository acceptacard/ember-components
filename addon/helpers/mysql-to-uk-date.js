import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';
import { DEFAULT_DATE_FORMAT, MYSQL_DATE_FORMAT } from '../modules/datetime';
import moment from 'moment';

export function mysqlToUkDate(params) {
    if(isPresent(params[0])) {
        return moment(params[0], MYSQL_DATE_FORMAT).format(DEFAULT_DATE_FORMAT);
    }
}

export default helper(mysqlToUkDate);
