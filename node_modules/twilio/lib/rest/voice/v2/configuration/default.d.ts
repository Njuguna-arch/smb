import { inspect, InspectOptions } from "util";
import V2 from "../../V2";
import { ApiResponse } from "../../../../base/ApiResponse";
export declare class DefaultConfigurationRequest {
    "configurationId"?: string;
    constructor(payload: any);
}
/**
 * Options to pass to create a DefaultInstance
 */
export interface DefaultListInstanceCreateOptions {
    /**  */
    defaultConfigurationRequest?: DefaultConfigurationRequest;
}
export interface DefaultSolution {
    type: string;
}
export interface DefaultListInstance {
    _version: V2;
    _solution: DefaultSolution;
    _uri: string;
    /**
     * Create a DefaultInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed void
     */
    create(callback?: (error: Error | null, item?: void) => any): Promise<void>;
    /**
     * Create a DefaultInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DefaultInstance
     */
    create(params: DefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: void) => any): Promise<void>;
    /**
     * Create a DefaultInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed void with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<void>) => any): Promise<ApiResponse<void>>;
    /**
     * Create a DefaultInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DefaultInstance with HTTP metadata
     */
    createWithHttpInfo(params: DefaultConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<void>) => any): Promise<ApiResponse<void>>;
    /**
     * Fetch a DefaultInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DefaultInstance
     */
    fetch(callback?: (error: Error | null, item?: DefaultInstance) => any): Promise<DefaultInstance>;
    /**
     * Fetch a DefaultInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed DefaultInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<DefaultInstance>) => any): Promise<ApiResponse<DefaultInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function DefaultListInstance(version: V2, type: string): DefaultListInstance;
interface DefaultResource {
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
export declare class DefaultInstance {
    protected _version: V2;
    constructor(_version: V2, payload: DefaultResource, type: string);
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
export {};
