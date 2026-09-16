import { inspect, InspectOptions } from "util";
import V2 from "../V2";
import { ApiResponse } from "../../../base/ApiResponse";
/**
 * Configuration for Twilio Voice Transcription Service. Either transcriptionStatusCallback or conversationConfigurationId (or both) must be provided.
 */
export declare class VoiceV2ConfigurationTranscriptionConfiguration {
    /**
     * The configuration type discriminator. Always \"Transcription\" for this resource.
     */
    "configurationType": string;
    /**
     * The transcription engine provider. Supported values: \'google\', \'deepgram\', \'twilio_managed\'. When using \'twilio_managed\', do not specify a speechModel.
     */
    "transcriptionEngine": string;
    /**
     * The specific speech model to use for transcription. Valid models depend on transcriptionEngine: For \'google\': chirp_2. For \'deepgram\': nova-3, nova-2. For \'twilio_managed\': twilio_managed.
     */
    "speechModel"?: string | null;
    /**
     * Controls how the ASR handles language. Can be a supported BCP-47 language code, or \'multi\' for multilingual code switching (Deepgram engine only). Supported language codes: en-US, en-GB, en-AU, de-DE, fr-FR, it-IT, es-MX, es-ES, es-US, pt-BR, pt-PT, nl-NL, no-NO, pl-PL, sv-SE, da-DK.
     */
    "language": string;
    "transcriptionStatusCallback"?: VoiceV2ConfigurationTranscriptionStatusCallback;
    /**
     * The ID of the Maestro Conversations Configuration for transcription storage and optional add-ons.
     */
    "conversationConfigurationId"?: string | null;
    /**
     * Default participant roles and channel mappings for diarization and implicit participant creation. Must include exactly 2 participants mapping audioChannelIndex 1 and 2.
     */
    "participantDefaults": Array<VoiceV2ConfigurationTranscriptionParticipantDefault>;
    constructor(payload: any);
}
/**
 * Default participant role and channel mapping for diarization and implicit participant creation.
 */
export declare class VoiceV2ConfigurationTranscriptionParticipantDefault {
    /**
     * One-based index of the audio channel in a multi-channel recording associated with this role.
     */
    "audioChannelIndex": number;
    /**
     * The participant role to apply when inferring participants.
     */
    "type": string;
    constructor(payload: any);
}
/**
 * Request body for creating or updating a Transcription Configuration.
 */
export declare class VoiceV2ConfigurationTranscriptionRequest {
    /**
     * The unique name.
     */
    "uniqueName"?: string | null;
    /**
     * The description.
     */
    "description"?: string | null;
    "configuration": VoiceV2ConfigurationTranscriptionConfiguration;
    constructor(payload: any);
}
/**
 * Callback configuration for notifications when transcription is complete.
 */
export declare class VoiceV2ConfigurationTranscriptionStatusCallback {
    /**
     * The webhook callback URL.
     */
    "url"?: string | null;
    /**
     * The HTTP method to use for the webhook callback.
     */
    "method"?: string | null;
    constructor(payload: any);
}
/**
 * Options to pass to update a TranscriptionInstance
 */
export interface TranscriptionContextUpdateOptions {
    /**  */
    voiceV2ConfigurationTranscriptionRequest?: VoiceV2ConfigurationTranscriptionRequest;
}
/**
 * Options to pass to create a TranscriptionInstance
 */
export interface TranscriptionListInstanceCreateOptions {
    /**  */
    voiceV2ConfigurationTranscriptionRequest?: VoiceV2ConfigurationTranscriptionRequest;
}
export interface TranscriptionContext {
    /**
     * Remove a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    fetch(callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Fetch a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Update a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    update(callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Update a TranscriptionInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    update(params: VoiceV2ConfigurationTranscriptionRequest, headers?: any, callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Update a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Update a TranscriptionInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2ConfigurationTranscriptionRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface TranscriptionContextSolution {
    idOrUniqueName: string;
}
export declare class TranscriptionContextImpl implements TranscriptionContext {
    protected _version: V2;
    protected _solution: TranscriptionContextSolution;
    protected _uri: string;
    constructor(_version: V2, idOrUniqueName: string);
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    fetch(callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    update(params?: VoiceV2ConfigurationTranscriptionRequest | ((error: Error | null, item?: TranscriptionInstance) => any), headers?: any, callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    updateWithHttpInfo(params?: VoiceV2ConfigurationTranscriptionRequest | ((error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any), headers?: any, callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): TranscriptionContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface TranscriptionResource {
    id: string;
    account_sid: string;
    unique_name: string;
    description: string;
    date_created: Date;
    date_updated: Date;
    configuration: VoiceV2ConfigurationTranscriptionConfiguration;
    message: string;
    code: number;
    status: number;
    more_info: string;
}
/**
 * Response body for a Transcription Configuration.
 */
export declare class TranscriptionInstance {
    protected _version: V2;
    protected _solution: TranscriptionContextSolution;
    protected _context?: TranscriptionContext;
    constructor(_version: V2, payload: TranscriptionResource, idOrUniqueName?: string);
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
    configuration: VoiceV2ConfigurationTranscriptionConfiguration;
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
     * Remove a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean
     */
    remove(callback?: (error: Error | null, item?: boolean) => any): Promise<boolean>;
    /**
     * Remove a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed boolean with HTTP metadata
     */
    removeWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<boolean>) => any): Promise<ApiResponse<boolean>>;
    /**
     * Fetch a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    fetch(callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Fetch a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Update a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    update(callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Update a TranscriptionInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    update(params: VoiceV2ConfigurationTranscriptionRequest, headers?: any, callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Update a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Update a TranscriptionInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    updateWithHttpInfo(params: VoiceV2ConfigurationTranscriptionRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
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
        configuration: VoiceV2ConfigurationTranscriptionConfiguration;
        message: string;
        code: number;
        status: number;
        moreInfo: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface TranscriptionSolution {
}
export interface TranscriptionListInstance {
    _version: V2;
    _solution: TranscriptionSolution;
    _uri: string;
    (idOrUniqueName: string): TranscriptionContext;
    get(idOrUniqueName: string): TranscriptionContext;
    /**
     * Create a TranscriptionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    create(callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Create a TranscriptionInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance
     */
    create(params: VoiceV2ConfigurationTranscriptionRequest, headers?: any, callback?: (error: Error | null, item?: TranscriptionInstance) => any): Promise<TranscriptionInstance>;
    /**
     * Create a TranscriptionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Create a TranscriptionInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TranscriptionInstance with HTTP metadata
     */
    createWithHttpInfo(params: VoiceV2ConfigurationTranscriptionRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<TranscriptionInstance>) => any): Promise<ApiResponse<TranscriptionInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function TranscriptionListInstance(version: V2): TranscriptionListInstance;
export {};
