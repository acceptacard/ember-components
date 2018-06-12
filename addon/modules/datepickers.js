import { computed } from '@ember/object';
import { DEFAULT_DATE_FORMAT, DEFAULT_FLATPICKR_DATE_FORMAT } from 'datetime';
import moment from 'moment';

// ---------- CONSTANTS ----------
export const defaultListFromDate = moment().subtract(1, 'month').format(DEFAULT_DATE_FORMAT);
export const defaultListToDate = moment().format(DEFAULT_DATE_FORMAT);

export const DOB = {
    format: DEFAULT_FLATPICKR_DATE_FORMAT,
    minDate: moment().subtract(100, 'years').toDate(),
    maxDate: moment().subtract(18, 'years').subtract(1, 'day').toDate(),
};

export const LAST_HUNDRED_YEARS = {
    format: DEFAULT_FLATPICKR_DATE_FORMAT,
    minDate: moment().subtract(100, 'years').toDate(),
    maxDate: moment().subtract(1, 'days').toDate(),
};

export const IN_FUTURE = {
    format: DEFAULT_FLATPICKR_DATE_FORMAT,
    minDate: moment().add(1, 'days').toDate(),
    maxDate: moment().add(100, 'years').toDate(),
};

export const TODAY_ONWARDS = {
    format: DEFAULT_FLATPICKR_DATE_FORMAT,
    minDate: moment().toDate(),
    maxDate: moment().add(100, 'years').toDate(),
};


// ---------- COMPUTED PROPERTIES ----------
export let lastTenYearsFrom = computed('toDate', function(){
    return {
        format: DEFAULT_FLATPICKR_DATE_FORMAT,
        minDate: moment().subtract(10, 'years').toDate(),
        maxDate: moment(this.get('toDate'), DEFAULT_DATE_FORMAT).toDate(),
    };
});

export let lastTenYearsTo = computed('fromDate', function() {
    return {
        format: DEFAULT_FLATPICKR_DATE_FORMAT,
        minDate: moment(this.get('fromDate'), DEFAULT_DATE_FORMAT).toDate(),
        maxDate: moment().toDate()
    };
});