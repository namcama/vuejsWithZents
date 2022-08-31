export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authUser: {},
        accessToken: '',
    },
    mutations: {
        updateLoginStatus(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        },
        updateAuthUser(state, authUser) {
            state.authUser = authUser
        },
        updateAccessToken(state, token) {
            state.accessToken = token
        },
    },
}