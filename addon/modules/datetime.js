import moment from 'moment';

export const MINUTE_IN_MILLISECONDS = 60000;
export const TYPEAHEAD_WAIT_MILLISECONDS = 800;

export const DEFAULT_DATE_FORMAT = 'DD/MM/YYYY';
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
export const DEFAULT_DATE_TIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;
export const DEFAULT_FLATPICKR_DATE_FORMAT = 'd/m/Y';
export const DEFAULT_FLATPICKR_TIME_FORMAT = 'H:i:S';
export const DEFAULT_FLATPICKR_DATE_TIME_FORMAT = `${DEFAULT_FLATPICKR_DATE_FORMAT} ${DEFAULT_FLATPICKR_DATE_TIME_FORMAT}`;
export const MYSQL_DATE_FORMAT = 'YYYY-MM-DD';
export const MYSQL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const DEFAULT_NAMED_DATE = 'today';

export let convertNamedDateToDateRange = function (namedDate = DEFAULT_NAMED_DATE) {
    let from = moment();
    let to = moment();

    switch(namedDate) {
        case "yesterday":
            from = moment().subtract(1, 'days');
            to = moment().subtract(1, 'days');
            break;
        case "7days":
            from = moment().subtract(6, 'days');
            to = moment();
            break;
        case "30days":
            from = moment().subtract(30, 'days');
            to = moment();
            break;
    }

    return {
        from: from.format(DEFAULT_DATE_FORMAT),
        to:to.format(DEFAULT_DATE_FORMAT)
    }
};