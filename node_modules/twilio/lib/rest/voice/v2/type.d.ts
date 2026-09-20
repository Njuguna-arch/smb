import { inspect, InspectOptions } from "util";
import V2 from "../V2";
import { ApiResponse } from "../../../base/ApiResponse";
export declare class VoiceV2ConfigurationRequest {
    /**
     * The unique name
     */
    "uniqueName"?: string | null;
    /**
     * The description
     */
    "description"?: string | null;
    "configuration"?: Record<string, object>;
    constructor(payload: any);
}
/**
 * Options to pass to update a TypeInstance
 */
export interface TypeContextUpdateOptions {
    /**  */
    voiceV2ConfigurationRequest?: VoiceV2ConfigurationRequest;
}
export interface TypeContext {
    /**
     * Remove a TypeInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a TypeInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a TypeInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance
     */
    fetch(callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    /**
     * Fetch a TypeInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Update a TypeInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance
     */
    update(callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    /**
     * Update a TypeInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance
     */
    update(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    /**
     * Update a TypeInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Update a TypeInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface TypeContextSolution {
    type: string;
    idOrUniqueName: string;
}
export declare class TypeContextImpl implements TypeContext {
    protected _version: V2;
    protected _solution: TypeContextSolution;
    protected _uri: string;
    constructor(_version: V2, type: string, idOrUniqueName: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    fetch(callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    update(params?: VoiceV2ConfigurationRequest | ((error: Error | null, item?: TypeInstance) => any), headers?: any, callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    updateWithHttpInfo(params?: VoiceV2ConfigurationRequest | ((error: Error | null, item?: ApiResponse<TypeInstance>) => any), headers?: any, callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): TypeContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface TypeResource {
    message: string;
    code: number;
    status: number;
    more_info: string;
    id: string;
    account_sid: string;
    unique_name: string;
    description: string;
    date_created: Date;
    date_updated: Date;
    configuration: Record<string, object>;
}
/**
 * Twilio error response
 */
export declare class TypeInstance {
    protected _version: V2;
    protected _solution: TypeContextSolution;
    protected _context?: TypeContext;
    constructor(_version: V2, payload: TypeResource, type?: string, idOrUniqueName?: string);
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
    /**
     * Configuration Identifier
     */
    id: string;
    /**
     * Account sid
     */
    accountSid: string;
    /**
     * The unique name
     */
    uniqueName: string;
    /**
     * The description
     */
    description: string;
    dateCreated: Date;
    dateUpdated: Date;
    configuration: Record<string, object>;
    private get _proxy();
    /**
     * Remove a TypeInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a TypeInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a TypeInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance
     */
    fetch(callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    /**
     * Fetch a TypeInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Update a TypeInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance
     */
    update(callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    /**
     * Update a TypeInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance
     */
    update(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: TypeInstance) => any): Promise<TypeInstance>;
    /**
     * Update a TypeInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Update a TypeInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TypeInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<TypeInstance>) => any): Promise<ApiResponse<TypeInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        message: string;
        code: number;
        status: number;
        moreInfo: string;
        id: string;
        accountSid: string;
        uniqueName: string;
        description: string;
        dateCreated: Date;
        dateUpdated: Date;
        configuration: Record<string, object>;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface TypeSolution {
}
export interface TypeListInstance {
    _version: V2;
    _solution: TypeSolution;
    _uri: string;
    (type: string, idOrUniqueName: string): TypeContext;
    get(type: string, idOrUniqueName: string): TypeContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function TypeListInstance(version: V2): TypeListInstance;
export {};
