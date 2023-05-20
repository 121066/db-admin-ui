import formSearch from './index';
export { formSearch };
const components = [formSearch];
const install = (app) => {
    components.forEach((item) => {
        app.components(item.name, item);
    });
};
export default {
    install,
};
