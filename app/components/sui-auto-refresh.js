import Component from '@ember/component';
import {isPresent} from '@ember/utils';
import {inject} from '@ember/service';
import * as autoRefreshList from 'merchant-secure-operations-com/modules/auto-refresh-list';
import {underscoredRouteName} from 'merchant-secure-operations-com/modules/string';
import {TYPEAHEAD_WAIT_MILLISECONDS} from 'merchant-secure-operations-com/modules/datetime';
import {task, timeout} from 'ember-concurrency';
import {storageFor} from 'ember-local-storage';

export default Component.extend({

    router: inject(),

    tagName: '',

    autoRefresh: autoRefreshList.AUTO_REFRESH,
    autoRefreshMinutes: null,
    localStorage: storageFor('user-settings'),

    underscoredRouteName: underscoredRouteName,

    init() {
        this._super(...arguments);

        let autoRefreshMinutes = this.get(`localStorage.${this.get('underscoredRouteName')}_auto_refresh_minutes`);
        let autoRefreshEnabled = this.get(`localStorage.${this.get('underscoredRouteName')}_auto_refresh_enabled`);

        if (autoRefreshMinutes) {
            this.set('autoRefreshMinutes', autoRefreshMinutes);
        } else {
            this.set('autoRefreshMinutes', autoRefreshList.AUTO_REFRESH_MINUTES);
        }

        if (isPresent(autoRefreshEnabled)) {
            this.set('autoRefresh', autoRefreshEnabled);
        } else {
            this.set('autoRefresh', autoRefreshList.AUTO_REFRESH);
        }
    },

    taskRefresh: task(function* (autoRefreshMinutes) {
        yield timeout(TYPEAHEAD_WAIT_MILLISECONDS);
        this.set('autoRefreshMinutes', autoRefreshMinutes);
        this.set(`localStorage.${this.get('underscoredRouteName')}_auto_refresh_minutes`, autoRefreshMinutes);
        this.get('handleRefresh')(this.get('autoRefresh'), this.get('autoRefreshMinutes'));
    }).restartable(),

    actions: {
        taskRefresh: function (autoRefreshMinutes) {
            if (isPresent(autoRefreshMinutes) && !isNaN(autoRefreshMinutes)) {
                this.get('taskRefresh').perform(autoRefreshMinutes);
            }
        },

        updateAutoRefresh: function (autoRefresh) {
            this.set('autoRefresh', autoRefresh);
            this.set(`localStorage.${this.get('underscoredRouteName')}_auto_refresh_enabled`, autoRefresh);
            this.get('handleRefresh')(this.get('autoRefresh'), this.get('autoRefreshMinutes'));
        }
    }
});
