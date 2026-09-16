import { inspect, InspectOptions } from "util";
import V2 from "../V2";
import { ApiResponse } from "../../../base/ApiResponse";
export declare class VoiceV2AccountDefaultConfigurationRequest {
    /**
     * The description
     */
    "description"?: string | null;
    "configuration"?: Record<string, object>;
    constructor(payload: any);
}
/**
 * Options to pass to create a AccountDefaultConfigurationInstance
 */
export interface AccountDefaultConfigurationContextCreateOptions {
    /**  */
    voiceV2AccountDefaultConfigurationRequest?: VoiceV2AccountDefaultConfigurationRequest;
}
/**
 * Options to pass to update a AccountDefaultConfigurationInstance
 */
export interface AccountDefaultConfigurationContextUpdateOptions {
    /**  */
    voiceV2AccountDefaultConfigurationRequest?: VoiceV2AccountDefaultConfigurationRequest;
}
export interface AccountDefaultConfigurationContext {
    /**
     * Create a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    create(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Create a AccountDefaultConfigurationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    create(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Create a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Create a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Remove a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    fetch(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Fetch a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Update a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    update(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Update a AccountDefaultConfigurationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    update(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Update a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Update a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface AccountDefaultConfigurationContextSolution {
    type: string;
}
export declare class AccountDefaultConfigurationContextImpl implements AccountDefaultConfigurationContext {
    protected _version: V2;
    protected _solution: AccountDefaultConfigurationContextSolution;
    protected _uri: string;
    constructor(_version: V2, type: string);
    create(params?: VoiceV2AccountDefaultConfigurationRequest | ((error: Error | null, item?: AccountDefaultConfigurationInstance) => any), headers?: any, callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    createWithHttpInfo(params?: VoiceV2AccountDefaultConfigurationRequest | ((error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any), headers?: any, callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    fetch(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    update(params?: VoiceV2AccountDefaultConfigurationRequest | ((error: Error | null, item?: AccountDefaultConfigurationInstance) => any), headers?: any, callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    updateWithHttpInfo(params?: VoiceV2AccountDefaultConfigurationRequest | ((error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any), headers?: any, callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): AccountDefaultConfigurationContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface AccountDefaultConfigurationResource {
    account_sid: string;
    description: string;
    date_created: Date;
    date_updated: Date;
    configuration: Record<string, object>;
    message: string;
    code: number;
    status: number;
    more_info: string;
}
export declare class AccountDefaultConfigurationInstance {
    protected _version: V2;
    protected _solution: AccountDefaultConfigurationContextSolution;
    protected _context?: AccountDefaultConfigurationContext;
    constructor(_version: V2, payload: AccountDefaultConfigurationResource, type?: string);
    /**
     * Account sid
     */
    accountSid: string;
    /**
     * The description
     */
    description: string;
    dateCreated: Date;
    dateUpdated: Date;
    configuration: Record<string, object>;
    /**
     * Error message
     */
    message: string;
    /**
     * Twilio error code
     */
    code: number;
    /**
     * status code
     */
    status: number;
    /**
     * More information about the error
     */
    moreInfo: string;
    private get _proxy();
    /**
     * Create a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    create(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Create a AccountDefaultConfigurationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    create(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Create a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Create a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Remove a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    fetch(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Fetch a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Update a AccountDefaultConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    update(callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Update a AccountDefaultConfigurationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance
     */
    update(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: AccountDefaultConfigurationInstance) => any): Promise<AccountDefaultConfigurationInstance>;
    /**
     * Update a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Update a AccountDefaultConfigurationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed AccountDefaultConfigurationInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2AccountDefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<AccountDefaultConfigurationInstance>) => any): Promise<ApiResponse<AccountDefaultConfigurationInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        accountSid: string;
        description: string;
        dateCreated: Date;
        dateUpdated: Date;
        configuration: Record<string, object>;
        message: string;
        code: number;
        status: number;
        moreInfo: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface AccountDefaultConfigurationSolution {
}
export interface AccountDefaultConfigurationListInstance {
    _version: V2;
    _solution: AccountDefaultConfigurationSolution;
    _uri: string;
    (type: string): AccountDefaultConfigurationContext;
    get(type: string): AccountDefaultConfigurationContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function AccountDefaultConfigurationListInstance(version: V2): AccountDefaultConfigurationListInstance;
export {};
