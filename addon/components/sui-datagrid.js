import Component from '@ember/component';
import {isPresent, isEmpty} from '@ember/utils';
import {computed} from '@ember/object';
import {htmlSafe} from "@ember/string";
import {DATAGRID_DISPLAYED_ROWS} from 'merchant-secure-operations-com/modules/dropdowns';
import layout from '../templates/components/sui-datagrid';

export default Component.extend({
    layout,
    classNames: ['ui', 'grid'],

    // Should the table headers show a "pointer" cursor in order to signify sortable.
    sortable: false,

    sortColumn: '',

    sortDirection: '',

    paginate: false,

    tableClasses: '',

    // Component has initialised its attributes (only fires on component creation, not on re-renders).
    init: function () {
        this._super(...arguments);

        // Set table classes.
        let cssClasses = ['unstackable', 'selectable', 'celled', 'padded', 'fixed', 'fluid',
            'basic', 'collapsing', 'striped', 'compact', 'definition', 'green',
            'olive', 'inverted', 'sortable', 'small', 'large'];

        // Set table classes based on those passed in. Can't be done normally as classes are set in the template here.
        cssClasses.forEach(cssClass => {
            if (isPresent(this.get(cssClass))) {
                this.set('tableClasses', this.get('tableClasses') + ' ' + cssClass);
            }
        });

        let config = this.get('config');

        // Loop over all config values and assign them to the component.
        for (let configItem in config) {
            this.set(configItem, this.get('config')[configItem]);
        }

        // Set the initial sort column.
        if (isPresent(this.get('config.sortColumn'))) {
            this.set('sortColumn', this.get('config.sortColumn'));
        } else {
            this.set('sortColumn', this.get('columns[0].name'));
        }

        // Set the initial sort direction.
        if (isPresent(this.get('config.sortDirection'))) {
            this.set('sortDirection', this.get('config.sortDirection'));
        } else {
            this.set('sortDirection', 'desc');
        }
    },

    didRender: function () {
        this._super(...arguments);
        this.set('datagridHeight', this.$().height());
    },

    didReceiveAttrs: function () {
        this._super(...arguments);

        // If the value of the filter text has been reset to blank then clear it.
        if (isEmpty('filterText')) {
            this.set('filterText', null);
        }
    },

    showBackToTop: computed('datagridHeight', function () {
        if (parseInt(this.get('datagridHeight')) > window.innerHeight) {
            return true;
        }
    }),

    rowInfoText: computed('offset', 'limit', 'totalRecords', 'content', function () {
        let total, intOffset, intLimit = 0;

        if (isPresent(this.get('totalRecords'))) {
            total = parseInt(this.get('totalRecords'));
        } else {
            total = 0;
        }


        if (this.get('limit') === 'all') {
            return `Showing all ${total} rows`;
        } else {
            if (total === 0) {
                intOffset = parseInt(this.get('offset'));
            } else {
                intOffset = parseInt(this.get('offset')) + 1;
            }

            intLimit = parseInt(this.get('limit')) - 1;
            let lastRowShown = intOffset + intLimit;

            if (total < lastRowShown) {
                lastRowShown = total;
            }

            return intOffset + ' to ' + lastRowShown + ' of ' + total;
        }
    }),

    // Determines the number of columns in this table so they can be equal width.
    // Accepts a string of the number of columns, e.g. "six wide", "fourteen wide".
    numberOfColumns: computed('config.numberOfColumns', function () {
        if (isPresent(this.get('config.numberOfColumns'))) {
            return this.get('config.numberOfColumns');
        }

        return false;
    }),

    height: computed('containerConfig', function () {
        return 'max-height: ' + this.get('containerConfig.height') + ';';
    }),

    textFilterSize: computed('containerConfig.textFilterWidth', function () {
        if (isPresent(this.get('containerConfig.textFilterWidth'))) {
            return this.get('containerConfig.textFilterWidth');
        }

        return 'four wide';
    }),


    datagridLoading: false,

    // String used to filter the table content.
    filterText: '',

    // Get comma-delimited attributes that should be searched.
    dataGridFilterAttributes: computed('datagrid.attributes', function () {
        var attributes = [];

        this.get('datagrid.attributes').forEach(function (attribute) {
            if (isPresent(attribute.get('filter')) && attribute.get('filter') === true) {
                attributes.pushObject(attribute.get('name'));
            }
        }, this);

        return attributes.join();
    }),

    dateFrom: computed.alias('filterFromDate'),

    dateTo: computed.alias('filterToDate'),

    dropdownDisplayedRows: DATAGRID_DISPLAYED_ROWS,
    datagridDisplayedRows: 'all',

    // Height table should be. A scrollbar will appear to allow access to the rest of the table rows.
    tableHeight: computed('config.tableHeight', function () {
        if (isPresent(this.get('config.tableHeight'))) {
            return new htmlSafe(`height: ${this.get('config.tableHeight')} px; overflow-y: scroll`);
        }

        return new htmlSafe('');
    }),

    actions: {
        // Row has been clicked.
        rowClicked: function (row) {
            // Call action on parent specified in component's "rowClicked" attribute.
            this.get('rowClicked')(row);
        },

        filterTextChanged: function (value) {
            this.set('filterText', value);
            this.get('filterByText')(value);
        },

        sortCaret: function (columnAttribute) {
            if (this.get('sortable')) {
                if (this.get('sortDirection') === 'asc') {
                    this.set('sortDirection', 'desc');
                } else {
                    this.set('sortDirection', 'asc');
                }

                this.set('sortColumn', columnAttribute);
            }

            var sortQueryParams;

            if (this.get('sortDirection') === 'desc') {
                sortQueryParams = '-' + this.get('sortColumn');
            } else {
                sortQueryParams = this.get('sortColumn');
            }

            this.get('sortByColumn')(sortQueryParams);
        },

        backToTop: function () {
            window.scrollTo(0, 0);
        }
    }
});
