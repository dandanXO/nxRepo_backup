export interface GetAttractionsALLRequestQueryArg {
    lang: string;
    page: number;
}
export interface GetAttractionsALLResponse {
    data: GetAttractionsALLResponseData[];
}
export interface GetAttractionsALLResponseData {
    id: number,
    name:string;
    name_zh:null;
    open_status:number;
    introduction:string;
    open_time:string;
    zipcode:string;
    distric:string;
    address:string;
    tel:string;
    fax:string;
    email:string;
    months:string;
    nlat:number;
    elong:number;
    official_site:string;
    facebook:string;
    ticket:string;
    remind:string;
    staytime:string;
    modified:string;
    url:string;
    category: GetAttractionsALLResponseCategoryData[];
    target: [],
    service: GetAttractionsALLResponseServiceData[];
    friendly:[];
    images: GetAttractionsALLResponseImageData;
    files: [];
    links: [];
}
export interface GetAttractionsALLResponseImageData {
    src: string;
    subject: string;
    ext: string;
}
export interface GetAttractionsALLResponseCategoryData {
    id: number;
    name: string
}
export interface GetAttractionsALLResponseServiceData {
    id: number;
    name: string;
}

