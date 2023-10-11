import { mussetoken } from "../lib/login.js";

function notLoggedIn() {
    alert("Du er ikke logget inn.");
    return "";
}

async function authenticatedRequest(url, method, data, params) {
    if (!mussetoken) {
        return notLoggedIn();
    }

    let headers = {"Authorization": `Bearer " + ${mussetoken}`, }; // Add JWT to header.
    
    if ((method == "POST" || method == "PUT") && data.length > 0){
        headers["Content-Type"] = "application/json";
    }

    const urlObj = new URL(url);
    if (params) {
        Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]));
    }

    let reqObj = { method: method, headers: headers };
    if (data.length > 0) {
        reqObj.body = data;
    }

    return fetch(urlObj.toString(), reqObj).then(response => {
        if (response.status == 200) {
            return response.json();
        } else if (response.status == 401) {
            return notLoggedIn();
        }
    }).catch(error => {
        
    });
}

export async function authenticatedGetRequest(url, params) {
    return authenticatedRequest(url, "GET", "", params);
}

export async function authenticatedPostRequest(url, data, params) {
    return authenticatedRequest(url, "POST", data, params);
}

export async function authenticatedPutRequest(url, data, params) {
    return authenticatedRequest(url, "PUT", data, params);
}
