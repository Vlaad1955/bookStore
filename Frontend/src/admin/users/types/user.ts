export type User = {
    id: string;
    firstName: string;
    lastName: string;
    image: string;
    email: string;
    role: string;
    phone: string;
};

export type UserQueryParams = {
    sort?: string;
    order?: 'ASC' | 'DESC';
    page?: string;
    limit?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: number;
    age?: number;
}