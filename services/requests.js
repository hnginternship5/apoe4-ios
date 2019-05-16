import axios from 'axios';
import {
    config
} from '../config'

export const get_action = async (token, paths = "", params = "") => {
    try {
        const options = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.get(`${config.base_url}/${paths}${params}`, options);
        return response.data
    } catch (error) {
        throw JSON.parse(error.request._response);
    }
}

export const put_action = async (token, body, paths, params) => {
    try {
        const options = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put(`${config.base_url}/${paths}${params}`, body, options);
        return response.data
    } catch (error) {
        throw JSON.parse(error.request._response);
    }
}

export const post_action = async (token, body, paths, params) => {
    try {
        const options = {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`${config.base_url}/${paths}`, body, options);
        return response.data
    } catch (error) {
        throw JSON.parse(error.request._response);
    }
}

export const delete_action = async (token, paths, params) => {
    try {
        const options = {
            headers: {
                Authorization: token
            }
        }
        const response = await axios.get(`${config.base_url}/${paths}${params}`, options);
        return response.data
    } catch (error) {
        throw JSON.parse(error.request._response);
    }
}

export const uploads = async (token, paths, id, file) => {

    const options = {
        headers: {
            Authorization: token,
            'content-type': 'multipart/form-data'
        }
    }
    const formData = new FormData();
    formData.append('file', file)
    formData.append('folder', `${paths}/${id}`)
    const response = await axios.post(`${config.base_url}/integrations/uploads/file`, formData, options);
    return response.data;
};