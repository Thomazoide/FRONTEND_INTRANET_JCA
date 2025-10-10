
export enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export function GetRequestConfig(method: METHODS, type?: "JSON" | "FORM", body?: BodyInit, token?: string): RequestInit {
    return {
        method,
        headers: {
            "Content-Type": type === "JSON" ? "application/json" : "multipart/form-data",
            "Authorization": token || ""
        },
        body
    }
}