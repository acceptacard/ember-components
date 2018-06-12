
export function showDatagridLoader(controller, transition) {
    controller.set('datagridLoading', true);

    transition.promise.finally(() => {
        controller.set('datagridLoading', false);
    });
}