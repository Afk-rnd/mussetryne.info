import { mussetoken } from "../lib/login.js";
import { MUSSE_TOKEN_STORE_KEY } from "./constants.js";

let token = "";

mussetoken.subscribe((mussetoken) => {
    token = mussetoken;
});

if (token === "" && typeof window !== "undefined") {
    const t = localStorage.getItem(MUSSE_TOKEN_STORE_KEY);
    if(t){
        token = t;
    }
}

function notLoggedIn() {
    alert("Du er ikke logget inn.");
    return {};
}

async function authenticatedRequest(url, method, data, params, data_type) {
    if (!token) {
        return notLoggedIn();
    }

    let headers = {"Authorization": `Bearer ${token}`, }; // Add JWT to header.
    
    if (data_type != "none" && (method == "POST" || method == "PUT") && data.length > 0){
        if(data_type == "json"){
            headers["Content-Type"] = "application/json";
        }
        else if(data_type == "form"){
            headers["Content-Type"] = "multipart/form-data";
        }
    }

    let reqObj = { method: method, headers: headers };
    if (data) { // TODO: Find a better data-check?
        reqObj.body = data;
    }

    const urlWParams = params.length > 0 ? `${url}?${params}` : url;

    return fetch(urlWParams, reqObj).then(response => {
        if (response.status == 200) {
            if (response.headers.get("Content-Type") == "application/json") {
                return response.json();
            }
            else if (response.headers.get("Content-Type") == "text/plain") {
                return response.text();
            }
            else if (response.headers.get("Content-Type") == "image/jpeg" || response.headers.get("Content-Type") == "image/png") {
                return response.blob();
            }
            return response;
        } else if (response.status == 401) {
            return notLoggedIn();
        }
    }).catch(error => {
        
    });
}

export async function authenticatedGetRequest(url, params="") {
    return authenticatedRequest(url, "GET", "", params, "none");
}

export async function authenticatedPostRequest(url, data, params="", data_type="json") {
    return authenticatedRequest(url, "POST", data, params, data_type=data_type);
}

export async function authenticatedPutRequest(url, data, params="", data_type="json") {
    return authenticatedRequest(url, "PUT", data, params, data_type=data_type);
}
