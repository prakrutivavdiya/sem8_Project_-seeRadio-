import axios from 'axios';

export const publicPost = (path,payload, callback, errorcallback) => {
    axios.post(path, { ...payload })
        .then(response => {
                if (callback != null) {
                    callback(response);
                }
            }
        ).catch(err => {
            // catch error
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}

export const publicGet = (path, callback, errorcallback) => {
    axios.get(path)
    .then(response => {
            if (callback != null) {
                callback(response);
            }
        }
    ).catch(err => {
        // catch error
        if (errorcallback != null) {
            errorcallback(err);
        }
    })
}

export const privateGet = (path, headerobj, callback, errorcallback) => {
    axios.get(path,{ headers: headerobj })
    .then(response => {
            if (callback != null) {
                callback(response);
            }
        }
    ).catch(err => {
        // catch error
        if (errorcallback != null) {
            errorcallback(err);
        }
    })
}

export const privatePost = (path,headers,payload, callback, errorcallback) => {
    axios.post(path, { ...payload },{headers:headers})
        .then(response => {
                if (callback != null) {
                    callback(response);
                }
            }
        ).catch(err => {
            // catch error
            if (errorcallback != null) {
                errorcallback(err);
            }
        })
}
