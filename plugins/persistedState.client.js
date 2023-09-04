import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
    createPersistedState({
        key: "ticketManagement",
        paths: ["tickets"]
    })(store);
};
