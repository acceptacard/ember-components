import { computed } from '@ember/object';

export let underscoredRouteName = computed('router', function() {
    let routeName = this.get('router.currentRouteName');
    return routeName.replace(/\./g, '_');
});