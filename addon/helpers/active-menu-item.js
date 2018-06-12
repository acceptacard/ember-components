import { helper } from '@ember/component/helper';

const ACTIVE_MENU_CLASS = 'menu-active';

export function activeMenuItem([item, currentRouteName]) {
    return (currentRouteName.split('.')[0] == item) ? ACTIVE_MENU_CLASS : '';
}

export default helper(activeMenuItem);
