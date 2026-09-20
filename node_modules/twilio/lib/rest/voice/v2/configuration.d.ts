import { inspect, InspectOptions } from "util";
import V2 from "../V2";
import { ApiResponse } from "../../../base/ApiResponse";
import { DefaultListInstance } from "./configuration/default";
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
 * Options to pass to create a ConfigurationInstance
 */
export interface ConfigurationContextCreateOptions {
    /**  */
    voiceV2ConfigurationRequest?: VoiceV2ConfigurationRequest;
}
export interface ConfigurationContext {
    default: DefaultListInstance;
    /**
     * Create a ConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance
     */
    create(callback?: (error: Error | null, item?: ConfigurationInstance) => any): Promise<ConfigurationInstance>;
    /**
     * Create a ConfigurationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance
     */
    create(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ConfigurationInstance) => any): Promise<ConfigurationInstance>;
    /**
     * Create a ConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<ConfigurationInstance>) => any): Promise<ApiResponse<ConfigurationInstance>>;
    /**
     * Create a ConfigurationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<ConfigurationInstance>) => any): Promise<ApiResponse<ConfigurationInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface ConfigurationContextSolution {
    type: string;
}
export declare class ConfigurationContextImpl implements ConfigurationContext {
    protected _version: V2;
    protected _solution: ConfigurationContextSolution;
    protected _uri: string;
    protected _default?: DefaultListInstance;
    constructor(_version: V2, type: string);
    get default(): DefaultListInstance;
    create(params?: VoiceV2ConfigurationRequest | ((error: Error | null, item?: ConfigurationInstance) => any), headers?: any, callback?: (error: Error | null, item?: ConfigurationInstance) => any): Promise<ConfigurationInstance>;
    createWithHttpInfo(params?: VoiceV2ConfigurationRequest | ((error: Error | null, item?: ApiResponse<ConfigurationInstance>) => any), headers?: any, callback?: (error: Error | null, item?: ApiResponse<ConfigurationInstance>) => any): Promise<ApiResponse<ConfigurationInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): ConfigurationContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface ConfigurationResource {
    id: string;
    account_sid: string;
    unique_name: string;
    description: string;
    date_created: Date;
    date_updated: Date;
    configuration: Record<string, object>;
}
export declare class ConfigurationInstance {
    protected _version: V2;
    protected _solution: ConfigurationContextSolution;
    protected _context?: ConfigurationContext;
    constructor(_version: V2, payload: ConfigurationResource, type?: string);
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
     * Create a ConfigurationInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance
     */
    create(callback?: (error: Error | null, item?: ConfigurationInstance) => any): Promise<ConfigurationInstance>;
    /**
     * Create a ConfigurationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance
     */
    create(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ConfigurationInstance) => any): Promise<ConfigurationInstance>;
    /**
     * Create a ConfigurationInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<ConfigurationInstance>) => any): Promise<ApiResponse<ConfigurationInstance>>;
    /**
     * Create a ConfigurationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed ConfigurationInstance with HTTP metadata
     */
    createWithHttpInfo(params: VoiceV2ConfigurationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<ConfigurationInstance>) => any): Promise<ApiResponse<ConfigurationInstance>>;
    /**
     * Access the default.
     */
    default(): DefaultListInstance;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
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
export interface ConfigurationSolution {
}
export interface ConfigurationListInstance {
    _version: V2;
    _solution: ConfigurationSolution;
    _uri: string;
    (type: string): ConfigurationContext;
    get(type: string): ConfigurationContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function ConfigurationListInstance(version: V2): ConfigurationListInstance;
export {};
