export interface Route{
    path: string,
    event: any, 
}

export interface Routes {
    get: Route[],
    post: Route[],
}