import Component from '@ember/component';
import {inject} from '@ember/service';
import layout from '../templates/components/sui-datagrid-controls';

export default Component.extend({
    layout,
    tagName: '',

    actions: {
        showHideFilters() {
            this.get('actionShowHideFilters')();
        },

        filterResults() {
            this.get('actionFilterResults')();
        },

        changeFromDate(dates, dateString) {
            this.get('actionFromDateChange')(dates, dateString);
        },

        changeToDate(dates, dateString) {
            this.get('actionToDateChange')(dates, dateString);
        },

        refresh() {
            this.get('actionRefreshList')();
        },

        resetFilters() {
            this.get('actionResetList')();
        }
    }
});
