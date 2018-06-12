import { helper } from '@ember/component/helper';

export function checkRoles([requiredRoles, usersRoles]) {
    let found = false;

    if(requiredRoles && usersRoles) {
        requiredRoles.forEach(requiredRole => {
            if(usersRoles.includes(requiredRole)) {
                found = true;
            }
        });
    }

    return found;
}

export default helper(checkRoles);
