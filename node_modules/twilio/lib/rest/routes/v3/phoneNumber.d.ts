import { inspect, InspectOptions } from "util";
import V3 from "../V3";
import { ApiResponse } from "../../../base/ApiResponse";
/**
 * Options to pass to update a PhoneNumberInstance
 */
export interface PhoneNumberContextUpdateOptions {
    /** The Inbound Processing Region used for this phone number for voice */
    voiceRegion?: string;
    /** The Inbound Processing Region used for this phone number for messaging */
    messagingRegion?: string;
    /** A human readable description of this resource, up to 64 characters. */
    friendlyName?: string;
}
export interface PhoneNumberContext {
    /**
     * Fetch a PhoneNumberInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance
     */
    fetch(callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    /**
     * Fetch a PhoneNumberInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Update a PhoneNumberInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance
     */
    update(callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    /**
     * Update a PhoneNumberInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance
     */
    update(params: PhoneNumberContextUpdateOptions, callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    /**
     * Update a PhoneNumberInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Update a PhoneNumberInstance and return HTTP info
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance with HTTP metadata
     */
    updateWithHttpInfo(params: PhoneNumberContextUpdateOptions, callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface PhoneNumberContextSolution {
    phoneNumber: string;
}
export declare class PhoneNumberContextImpl implements PhoneNumberContext {
    protected _version: V3;
    protected _solution: PhoneNumberContextSolution;
    protected _uri: string;
    constructor(_version: V3, phoneNumber: string);
    fetch(callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    update(params?: PhoneNumberContextUpdateOptions | ((error: Error | null, item?: PhoneNumberInstance) => any), callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    updateWithHttpInfo(params?: PhoneNumberContextUpdateOptions | ((error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any), callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): PhoneNumberContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface PhoneNumberResource {
    phoneNumber: string;
    url: string;
    accountSid: string;
    friendlyName: string;
    voiceRegion: string;
    messagingRegion: string;
    dateCreated: Date;
    dateUpdated: Date;
}
export declare class PhoneNumberInstance {
    protected _version: V3;
    protected _solution: PhoneNumberContextSolution;
    protected _context?: PhoneNumberContext;
    constructor(_version: V3, _payload: PhoneNumberResource, phoneNumber?: string);
    /**
     * The phone number in E.164 format
     */
    phoneNumber: string;
    /**
     * The absolute URL of the resource.
     */
    url: string;
    /**
     * The unique SID identifier of the Account.
     */
    accountSid: string;
    /**
     * A human readable description of the Inbound Processing Region assignments for this phone number, up to 64 characters.
     */
    friendlyName: string;
    /**
     * The Inbound Processing Region used for this phone number for voice.
     */
    voiceRegion: string;
    /**
     * The Inbound Processing Region used for this phone number for messaging.
     */
    messagingRegion: string;
    /**
     * The date that this phone number was assigned an Inbound Processing Region, given in ISO 8601 format.
     */
    dateCreated: Date;
    /**
     * The date that the Inbound Processing Region was updated for this phone number, given in ISO 8601 format.
     */
    dateUpdated: Date;
    private get _proxy();
    /**
     * Fetch a PhoneNumberInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance
     */
    fetch(callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    /**
     * Fetch a PhoneNumberInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Update a PhoneNumberInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance
     */
    update(callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    /**
     * Update a PhoneNumberInstance
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance
     */
    update(params: PhoneNumberContextUpdateOptions, callback?: (error: Error | null, item?: PhoneNumberInstance) => any): Promise<PhoneNumberInstance>;
    /**
     * Update a PhoneNumberInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance with HTTP metadata
     */
    updateWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Update a PhoneNumberInstance and return HTTP info
     *
     * @param params - Parameter for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed PhoneNumberInstance with HTTP metadata
     */
    updateWithHttpInfo(params: PhoneNumberContextUpdateOptions, callback?: (error: Error | null, item?: ApiResponse<PhoneNumberInstance>) => any): Promise<ApiResponse<PhoneNumberInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        phoneNumber: string;
        url: string;
        accountSid: string;
        friendlyName: string;
        voiceRegion: string;
        messagingRegion: string;
        dateCreated: Date;
        dateUpdated: Date;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface PhoneNumberSolution {
}
export interface PhoneNumberListInstance {
    _version: V3;
    _solution: PhoneNumberSolution;
    _uri: string;
    (phoneNumber: string): PhoneNumberContext;
    get(phoneNumber: string): PhoneNumberContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function PhoneNumberListInstance(version: V3): PhoneNumberListInstance;
export {};
