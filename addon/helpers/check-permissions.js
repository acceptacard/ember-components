import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function checkPermissions([requiredPermissions, usersPermissions]) {
    let found = false;

    if(isPresent(requiredPermissions) && isPresent(usersPermissions)) {
        requiredPermissions.forEach(requiredPermission => {
            if(usersPermissions.includes(requiredPermission)) {
                found = true;
            }
        });
    }

    return found;
}

export default helper(checkPermissions);
