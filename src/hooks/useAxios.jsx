import { useState, useCallback } from "react";
import axios from "axios";
import { SERVER_TYPE } from "../constants";


const BASE_URLS = {
    [SERVER_TYPE.DEFAULT]: `${import.meta.env.VITE_BASE_URL}`,
    // [SERVER_TYPE.PLANS]: `${import.meta.env.VITE_plans}/api`,        
};

const createAxiosConfig = (contentType = "", withCredentials = false) => {
    const config = {};

    if (withCredentials) {
        config.withCredentials = true;
    }

    if (contentType) {
        config.headers = {
            "Content-Type": contentType || "application/json"
        };
    }

    return config;
};

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const normalizeUrl = (url) => {
        return url?.startsWith("/") ? url : `/${url}`;
    };

    const sendRequest = useCallback(
        async ({
            method,
            url,
            data = undefined,
            params = {},
            contentType = "",
            withCredentials = true,
            baseURLKey = SERVER_TYPE.DEFAULT,
        }) => {
            setLoading(true);
            setError(null);

            const baseURL = BASE_URLS?.[baseURLKey] || BASE_URLS[SERVER_TYPE.DEFAULT];
            const normalizedUrl = normalizeUrl(url);
            const config = createAxiosConfig(contentType, withCredentials);

            try {
                const response = await axios({
                    method,
                    url: `${baseURL}${normalizedUrl}`,
                    data,
                    params,
                    ...config

                });
               return response;
            } catch (err) {
                const errorMsg = err?.response?.data?.message || "An error occurred";
                setError(errorMsg);
                 throw err;
            }
            finally {
                setLoading(false)
            }
        },
        []
    );

    const request = useCallback(
        (method) => ({ url, data, params, contentType, withCredentials, baseURLKey }) =>
            sendRequest({
                method,
                url,
                data,
                params,
                contentType,
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
