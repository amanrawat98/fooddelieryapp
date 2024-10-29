import { useState, useCallback } from "react";
import axios from "axios";
import { SERVER_TYPE } from "../constants";

const BASE_URLS = {
    [SERVER_TYPE.DEFAULT]: `${import.meta.env.VITE_BASE_URL}`,
};

axios.defaults.baseURL = BASE_URLS[SERVER_TYPE.DEFAULT];
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => response,
    error => {
        const errorMsg = error?.response?.data?.message ||
            (error.message.includes("Network Error") ? "Network or CORS error occurred" : "An error occurred");
        return Promise.reject(new Error(errorMsg));
    }
);

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(
        async ({
            method,
            url,
            data,
            params,
            headers = {},
            withCredentials = true,
            baseURLKey = SERVER_TYPE.DEFAULT,
        }) => {
            const controller = new AbortController();
            const { signal } = controller;

            const defaultHeaders = { "Content-Type": "application/json", ...headers };

            const baseURL = BASE_URLS?.[baseURLKey] || BASE_URLS[SERVER_TYPE.DEFAULT];
            axios.defaults.baseURL = baseURL;

            setLoading(true);
            setError(null);

            try {
                const response = await axios({
                    method,
                    url,
                    data,
                    params,
                    headers: defaultHeaders,
                    withCredentials,
                    signal,
                });
                return response;
            } catch (err) {
                setError(err.message);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const request = useCallback(
        (method) => ({ url, data, params, headers, withCredentials, baseURLKey }) =>
            sendRequest({
                method,
                url,
                data,
                params,
                headers,
                withCredentials,
                baseURLKey,
            }),
        [sendRequest]
    );

    return {
        get: request("get"),
        post: request("post"),
        put: request("put"),
        patch: request("patch"),
        del: request("delete"),
        loading,
        error,
    };
};

export default useAxios;
