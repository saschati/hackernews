export interface PagginationQueryArgs { 
    take: number;
    skip: number;
}

export enum Sort {
    ASC = 'asc',
    DESC = 'desc'
}