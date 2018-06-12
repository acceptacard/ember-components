import Component from '@ember/component';
import moment from 'moment';
import {DEFAULT_DATE_FORMAT} from 'merchant-secure-operations-com/modules/datetime';

export default Component.extend({
    picker: null,

    didInsertElement: function () {
        this._super(...arguments);
        this.set('options', this.get('options'));
        this.set('options.field', this.$('input')[0]);
        this.set('picker', new Pikaday(this.get('options')));
        this.get('picker').setMinDate(this.get('options.minDate'));
        this.get('picker').setMaxDate(this.get('options.maxDate'));
    },

    didUpdateAttrs: function () {
        this.get('picker').setMoment(moment(this.get('value'), DEFAULT_DATE_FORMAT));
    },

    willDestroyElement: function () {
        this._super(...arguments);
        this.get('picker').destroy();
    },

    actions: {
        openPikaday: function () {
            this.get('picker').show();
        },
        updateValue: function (date) {
            this.get('update')(date);
        }
    }
});
