export type Pagination = {
    limit?: number,
    offset?: number,
    page?: number
}

export type Pageable = Required<Pagination> & {
    totalPages: number,
    sort: string | null
}

export type Sort = {
    type: string,
    order?: 'asc' | 'desc'
}

export const pagination = ({limit = 10, offset = 0, page = 0}: Pagination, sort?: Sort) => {
    let pageable = `limit=${limit}&offset=${offset}&page=${page}`;
    if (sort) pageable += `&sort=${sort.type} ${sort.order || 'asc'}`;
    return pageable;
}