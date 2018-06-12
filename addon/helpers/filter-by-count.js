import { helper } from '@ember/component/helper';

export function filterByCount([data, filterKey, filterValue]) {
    return data.filterBy(filterKey, filterValue).length;
}

export default helper(filterByCount);
