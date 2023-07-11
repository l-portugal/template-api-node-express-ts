export interface IError<K = string> {
    code: K;
    message: string;
    description?: string;
}

/**
 * Interface used for controllers response
 */
export interface IResponse<T = any, K = string> {
    message: string;
    data?: T;
    error?: IError<K>;
}

/**
 * Interface used for process response
 */
export interface IProcessResponse<T = any, K = string> extends IResponse<T, K> {
    status: TProcessStatusTypes;
}

export type TProcessStatusTypes = 'success' | 'invalid' | 'error';
