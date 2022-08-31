export default {
    namespaced: true,
    state: {
        workflows: [],
        isShow: false,
        isDsNone: false,
        cardId: ''
    },
    getters: {},
    mutations: {
        updateWorkflows: (state, value) => {
            state.workflows = value
        },
        updateIsShow: (state, value) => {
            state.isShow = value
        },
        updateIsDsNone: (state, value) => {
            state.isDsNone = value
        },
        updateCardId: (state, value) => {
            state.cardId = value
        },
    }
}