export enum DISTRICT {
    GET_ALL_DATA = "oauth/district/get-all-data",
}

export enum WARD {
    GET_DATA_BY_DISTRICT = "oauth/ward/",
}

export enum CATEGORY {
    GET_TYPE_HOUSE = "oauth/category/channel-group",
}

export enum ROOMS {
    CREATE_OR_UPDATE = "oauth/rooms/ws/create-or-update",
    SEARCH_DATA='oauth/rooms/search-data',
    GET_DATA_DETAIL='oauth/rooms/get-data-detail/',
    GET_DATA_BY_USER_ID='oauth/rooms/ws/get-data-by-user-id'
}

export enum USER {
    CREATE_OR_UPDATE = "oauth/user/create-or-update",
}