import axios from 'axios'
import store from '../store'
import router from '../router'

const baseUrl = 'http://vuecourse.zent.edu.vn';

export const apiAxios = axios.create({
    baseURL: `${baseUrl}/api`,
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
})

apiAxios.interceptors.request.use(config => {
    let token = store.state.auth.accessToken
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

apiAxios.interceptors.response.use(undefined, (error) => {
    if (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry && router.currentRoute.name !== 'Login') {
            store.commit('auth/updateLoginStatus', false)
            store.commit('auth/updateAuthUser', {})
            store.commit('auth/updateAccessToken', '')
            return router.push({ name: 'Login' })
        }
    }
    return Promise.reject(error);
})

export default {
    /*=====Auth=====*/
    //Đăng ký
    register(data) {
        return apiAxios({
            method: 'post',
            url: '/auth/register',
            data: data
        })
    },
    //Đăng nhập
    login(data) {
        return apiAxios({
            method: 'post',
            url: '/auth/login',
            data: data
        })
    },
    //Đăng xuất
    logout() {
        return apiAxios({
            method: 'post',
            url: '/auth/logout',
        })
    },
    //Lấy thông tin người dùng
    getAuthUser() {
        return apiAxios({
            method: 'get',
            url: '/auth/me',
        })
    },
    /*==========*/



    /*=====Người dùng=====*/
    //Thay đổi thông tin người dùng
    updateUserInfo(data) {
        return apiAxios({
            method: 'post',
            url: '/users',
            data: data
        })
    },
    //Thay đổi mật khẩu người dùng
    updateUserPassword(data) {
        return apiAxios({
            method: 'put',
            url: '/users/password',
            data: data
        })
    },
    /*==========*/



    /*=====Danh mục=====*/
    //Lấy danh mục
    getListDirectory() {
        return apiAxios({
            method: 'get',
            url: '/directories',
        })
    },
    //Tạo danh mục
    createDirectory(data) {
        return apiAxios({
            method: 'post',
            url: '/directories',
            data: data
        })
    },
    //Thay đổi thông tin danh mục
    updateDirectory(data, id) {
        return apiAxios({
            method: 'put',
            url: `/directories/${id}`,
            data: data
        })
    },
    //Xóa danh mục
    deleteDirectory(id) {
        return apiAxios({
            method: 'delete',
            url: `/directories/${id}`,
        })
    },
    //Thay đổi vị trí danh mục
    changeIndexDirectory(data, id) {
        return apiAxios({
            method: 'put',
            url: `/directories/${id}/index`,
            data: data
        })
    },
    /*==========*/



    /*=====Thẻ=====*/
    //Tạo thẻ
    createCard(data) {
        return apiAxios({
            method: 'post',
            url: '/cards',
            data: data
        })
    },
    //Thay đổi thông tin thẻ
    updateCard(data, id) {
        return apiAxios({
            method: 'put',
            url: `/cards/${id}`,
            data: data
        })
    },
    //Xóa thẻ
    deleteCard(id) {
        return apiAxios({
            method: 'delete',
            url: `/cards/${id}`,
        })
    },
    //Thay đổi vị trí thẻ giữa các danh mục
    changeIndexCardDirectory(data, id) {
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/directory`,
            data: data
        })
    },
    //Thay đổi vị trí thẻ
    changeIndexCard(data, id) {
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/index`,
            data: data
        })
    },
    //Lấy thông tin thẻ
    getCardDetail(id) {
        return apiAxios({
            method: 'get',
            url: `/cards/${id}`,
        })
    },
    //Thay đổi trạng thái cho thẻ
    changeStatusCard(data, id) {
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/change-status`,
            data: data
        })
    },
    //Thay đổi deadline của thẻ
    changeDeadlineCard(data, id) {
        return apiAxios({
            method: 'put',
            url: `/cards/${id}/change-status-deadline`,
            data: data
        })
    },
    /*==========*/



    /*=====Công việc=====*/
    //Tạo công việc
    createCheckList(data) {
        return apiAxios({
            method: 'post',
            url: '/check-lists',
            data: data
        })
    },
    //Thay đổi thông tin công việc
    updateCheckList(data, id) {
        return apiAxios({
            method: 'put',
            url: `/check-lists/${id}`,
            data: data
        })
    },
    //Xóa công việc
    deleteCheckList(id) {
        return apiAxios({
            method: 'delete',
            url: `/check-lists/${id}`,
        })
    },
    /*==========*/



    /*=====Công việc con=====*/
    //Tạo công việc
    createCheckListChild(data) {
        return apiAxios({
            method: 'post',
            url: '/check-list-childs',
            data: data
        })
    },
    //Thay đổi thông tin công việc con
    updateCheckListChild(data, id) {
        return apiAxios({
            method: 'put',
            url: `/check-list-childs/${id}`,
            data: data
        })
    },
    //Xóa công việc con
    deleteCheckListChild(id) {
        return apiAxios({
            method: 'delete',
            url: `/check-list-childs/${id}`,
        })
    },
    //Thay đổi trạng thái công việc con
    updateStatusCheckListChild(data, id) {
        return apiAxios({
            method: 'put',
            url: `/check-list-childs/${id}/change-status`,
            data: data
        })
    },
    /*==========*/


    /*=====Files=====*/
    //Thêm file
    createFile(data, id) {
        return apiAxios({
            method: 'post',
            url: `/cards/${id}/upload-file`,
            data: data
        })
    },
    //Cập nhật file
    updateFile(data, id) {
        return apiAxios({
            method: 'put',
            url: `/files/${id}`,
            data: data
        })
    },
    //Xóa file
    deleteFile(id) {
        return apiAxios({
            method: 'delete',
            url: `/files/${id}`,
        })
    },
    /*==========*/



    /*=====Nhãn=====*/
    //Danh sách nhãn
    getTag() {
        return apiAxios({
            method: 'get',
            url: '/labels',
        })
    },
    //Thêm mới và gắn nhãn cho thẻ
    createTag(data, id) {
        return apiAxios({
            method: 'post',
            url: `/cards/${id}/label`,
            data: data
        })
    },
    //Cập nhật nhãn
    updateTag(data, id) {
        return apiAxios({
            method: 'put',
            url: `/labels/${id}`,
            data: data
        })
    },
    //Xóa nhãn
    deleteTag(id) {
        return apiAxios({
            method: 'delete',
            url: `/labels/${id}`,
        })
    },
    //Gắn nhãn có sẵn cho thẻ
    addTag(data, id) {
        return apiAxios({
            method: 'post',
            url: `/cards/${id}/attach-labels`,
            data: data
        })
    },
    //Gỡ nhãn khỏi nhẻ
    detachTag(data, id) {
        return apiAxios({
            method: 'delete',
            url: `/cards/${id}/detach-labels`,
            data: data
        })
    },

    /*==========*/
}