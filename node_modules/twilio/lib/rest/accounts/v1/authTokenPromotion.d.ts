import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
/**
 * Options to pass to update a AuthTokenPromotionInstance
 */
export interface AuthTokenPromotionContextUpdateOptions {
    /** Whether to suppress the email notification that Twilio sends to the owners and administrators of the account about this Auth Token change. Defaults to `false`, so Twilio sends the email. Set to `true` when rotating Auth Tokens across many subaccounts. */
    suppressEmailNotification?: boolean;
}
export interface AuthTokenPromotionContext {
    /**
     * Update a AuthTokenPromotionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance
     */
    update(callback?: (error: Error | null, item?: AuthTokenPromotionInstance) => any): Promise<AuthTokenPromotionInstance>;
    /**
     * Update a AuthTokenPromotionInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance
     */
    update(params: AuthTokenPromotionContextUpdateOptions, callback?: (error: Error | null, item?: AuthTokenPromotionInstance) => any): Promise<AuthTokenPromotionInstance>;
    /**
     * Update a AuthTokenPromotionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AuthTokenPromotionInstance>) => any): Promise<ApiResponse<AuthTokenPromotionInstance>>;
    /**
     * Update a AuthTokenPromotionInstance and return HTTP info
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance with HTTP metadata
     */
    updateWithHttpInfo(params: AuthTokenPromotionContextUpdateOptions, callback?: (error: Error | null, item?: ApiResponse<AuthTokenPromotionInstance>) => any): Promise<ApiResponse<AuthTokenPromotionInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface AuthTokenPromotionContextSolution {
}
export declare class AuthTokenPromotionContextImpl implements AuthTokenPromotionContext {
    protected _version: V1;
    protected _solution: AuthTokenPromotionContextSolution;
    protected _uri: string;
    constructor(_version: V1);
    update(params?: AuthTokenPromotionContextUpdateOptions | ((error: Error | null, item?: AuthTokenPromotionInstance) => any), callback?: (error: Error | null, item?: AuthTokenPromotionInstance) => any): Promise<AuthTokenPromotionInstance>;
    updateWithHttpInfo(params?: AuthTokenPromotionContextUpdateOptions | ((error: Error | null, item?: ApiResponse<AuthTokenPromotionInstance>) => any), callback?: (error: Error | null, item?: ApiResponse<AuthTokenPromotionInstance>) => any): Promise<ApiResponse<AuthTokenPromotionInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): AuthTokenPromotionContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface AuthTokenPromotionResource {
    account_sid: string;
    auth_token: string;
    date_created: Date;
    date_updated: Date;
    url: string;
}
export declare class AuthTokenPromotionInstance {
    protected _version: V1;
    protected _solution: AuthTokenPromotionContextSolution;
    protected _context?: AuthTokenPromotionContext;
    constructor(_version: V1, payload: AuthTokenPromotionResource);
    /**
     * The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that the secondary Auth Token was created for.
     */
    accountSid: string;
    /**
     * The promoted Auth Token that must be used to authenticate future API requests.
     */
    authToken: string;
    /**
     * The date and time in UTC when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateCreated: Date;
    /**
     * The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.
     */
    dateUpdated: Date;
    /**
     * The URI for this resource, relative to `https://accounts.twilio.com`
     */
    url: string;
    private get _proxy();
    /**
     * Update a AuthTokenPromotionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance
     */
    update(callback?: (error: Error | null, item?: AuthTokenPromotionInstance) => any): Promise<AuthTokenPromotionInstance>;
    /**
     * Update a AuthTokenPromotionInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance
     */
    update(params: AuthTokenPromotionContextUpdateOptions, callback?: (error: Error | null, item?: AuthTokenPromotionInstance) => any): Promise<AuthTokenPromotionInstance>;
    /**
     * Update a AuthTokenPromotionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AuthTokenPromotionInstance>) => any): Promise<ApiResponse<AuthTokenPromotionInstance>>;
    /**
     * Update a AuthTokenPromotionInstance and return HTTP info
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AuthTokenPromotionInstance with HTTP metadata
     */
    updateWithHttpInfo(params: AuthTokenPromotionContextUpdateOptions, callback?: (error: Error | null, item?: ApiResponse<AuthTokenPromotionInstance>) => any): Promise<ApiResponse<AuthTokenPromotionInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        accountSid: string;
        authToken: string;
        dateCreated: Date;
        dateUpdated: Date;
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface AuthTokenPromotionSolution {
}
export interface AuthTokenPromotionListInstance {
    _version: V1;
    _solution: AuthTokenPromotionSolution;
    _uri: string;
    (): AuthTokenPromotionContext;
    get(): AuthTokenPromotionContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function AuthTokenPromotionListInstance(version: V1): AuthTokenPromotionListInstance;
export {};
