import { inspect, InspectOptions } from "util";
import V2 from "../V2";
import { ApiResponse } from "../../../base/ApiResponse";
/**
 * The composition configuration for recordings.
 */
export declare class VoiceV2ConfigurationRecordingCompositionPolicy {
    /**
     * The number of channels to be composed.
     */
    "channels"?: string | null;
    /**
     * Trim the silence in the recordings.
     */
    "trim"?: string | null;
    /**
     * The audio track to record for the call.
     */
    "track"?: string | null;
    constructor(payload: any);
}
/**
 * Configuration for Twilio Voice Recording Service.
 */
export declare class VoiceV2ConfigurationRecordingConfiguration {
    /**
     * The configuration type discriminator. Always \"Recording\" for this resource.
     */
    "configurationType": string;
    "compositionPolicy"?: VoiceV2ConfigurationRecordingCompositionPolicy;
    "callRecordingStatusCallback"?: VoiceV2ConfigurationRecordingStatusCallback;
    "conferenceRecordingStatusCallback"?: VoiceV2ConfigurationRecordingStatusCallback;
    /**
     * The features to apply to this recording.
     */
    "features"?: Array<VoiceV2ConfigurationRecordingFeature> | null;
    constructor(payload: any);
}
/**
 * A feature to apply to a recording.
 */
export declare class VoiceV2ConfigurationRecordingFeature {
    /**
     * The type of feature.
     */
    "type": string;
    /**
     * The ID of the feature.
     */
    "featureId": string;
    /**
     * The description of the feature.
     */
    "description"?: string | null;
    constructor(payload: any);
}
/**
 * Request body for creating or updating a Recording Configuration.
 */
export declare class VoiceV2ConfigurationRecordingRequest {
    /**
     * The unique name.
     */
    "uniqueName"?: string | null;
    /**
     * The description.
     */
    "description"?: string | null;
    "configuration": VoiceV2ConfigurationRecordingConfiguration;
    constructor(payload: any);
}
/**
 * Callback configuration for a recording status.
 */
export declare class VoiceV2ConfigurationRecordingStatusCallback {
    /**
     * The recording status callback URL.
     */
    "url"?: string | null;
    /**
     * The recording status callback method.
     */
    "method"?: string | null;
    /**
     * The recording status callback events.
     */
    "events"?: Array<string> | null;
    constructor(payload: any);
}
/**
 * Options to pass to update a RecordingInstance
 */
export interface RecordingContextUpdateOptions {
    /**  */
    voiceV2ConfigurationRecordingRequest?: VoiceV2ConfigurationRecordingRequest;
}
/**
 * Options to pass to create a RecordingInstance
 */
export interface RecordingListInstanceCreateOptions {
    /**  */
    voiceV2ConfigurationRecordingRequest?: VoiceV2ConfigurationRecordingRequest;
}
export interface RecordingContext {
    /**
     * Remove a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    fetch(callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Fetch a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Update a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    update(callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Update a RecordingInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    update(params: VoiceV2ConfigurationRecordingRequest, headers?: any, callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Update a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Update a RecordingInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2ConfigurationRecordingRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface RecordingContextSolution {
    idOrUniqueName: string;
}
export declare class RecordingContextImpl implements RecordingContext {
    protected _version: V2;
    protected _solution: RecordingContextSolution;
    protected _uri: string;
    constructor(_version: V2, idOrUniqueName: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    fetch(callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    update(params?: VoiceV2ConfigurationRecordingRequest | ((error: Error | null, item?: RecordingInstance) => any), headers?: any, callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    updateWithHttpInfo(params?: VoiceV2ConfigurationRecordingRequest | ((error: Error | null, item?: ApiResponse<RecordingInstance>) => any), headers?: any, callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): RecordingContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface RecordingResource {
    id: string;
    account_sid: string;
    unique_name: string;
    description: string;
    date_created: Date;
    date_updated: Date;
    configuration: VoiceV2ConfigurationRecordingConfiguration;
    message: string;
    code: number;
    status: number;
    more_info: string;
}
/**
 * Response body for a Recording Configuration.
 */
export declare class RecordingInstance {
    protected _version: V2;
    protected _solution: RecordingContextSolution;
    protected _context?: RecordingContext;
    constructor(_version: V2, payload: RecordingResource, idOrUniqueName?: string);
    /**
     * Configuration Identifier.
     */
    id: string;
    /**
     * Account sid.
     */
    accountSid: string;
    /**
     * The unique name.
     */
    uniqueName: string;
    /**
     * The description.
     */
    description: string;
    dateCreated: Date;
    dateUpdated: Date;
    configuration: VoiceV2ConfigurationRecordingConfiguration;
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
     * Remove a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    fetch(callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Fetch a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Update a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    update(callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Update a RecordingInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    update(params: VoiceV2ConfigurationRecordingRequest, headers?: any, callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Update a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Update a RecordingInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2ConfigurationRecordingRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
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
        configuration: VoiceV2ConfigurationRecordingConfiguration;
        message: string;
        code: number;
        status: number;
        moreInfo: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface RecordingSolution {
}
export interface RecordingListInstance {
    _version: V2;
    _solution: RecordingSolution;
    _uri: string;
    (idOrUniqueName: string): RecordingContext;
    get(idOrUniqueName: string): RecordingContext;
    /**
     * Create a RecordingInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    create(callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Create a RecordingInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance
     */
    create(params: VoiceV2ConfigurationRecordingRequest, headers?: any, callback?: (error: Error | null, item?: RecordingInstance) => any): Promise<RecordingInstance>;
    /**
     * Create a RecordingInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Create a RecordingInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RecordingInstance with HTTP metadata
     */
    createWithHttpInfo(params: VoiceV2ConfigurationRecordingRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<RecordingInstance>) => any): Promise<ApiResponse<RecordingInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function RecordingListInstance(version: V2): RecordingListInstance;
export {};
