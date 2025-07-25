export interface ISuccessResponse<T> {
    status: true,
    message: string;
    data?: T;
}