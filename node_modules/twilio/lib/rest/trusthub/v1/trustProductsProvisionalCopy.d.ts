import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
export interface TrustProductsProvisionalCopyContext {
    /**
     * Create a TrustProductsProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance
     */
    create(callback?: (error: Error | null, item?: TrustProductsProvisionalCopyInstance) => any): Promise<TrustProductsProvisionalCopyInstance>;
    /**
     * Create a TrustProductsProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TrustProductsProvisionalCopyInstance>) => any): Promise<ApiResponse<TrustProductsProvisionalCopyInstance>>;
    /**
     * Fetch a TrustProductsProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance
     */
    fetch(callback?: (error: Error | null, item?: TrustProductsProvisionalCopyInstance) => any): Promise<TrustProductsProvisionalCopyInstance>;
    /**
     * Fetch a TrustProductsProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TrustProductsProvisionalCopyInstance>) => any): Promise<ApiResponse<TrustProductsProvisionalCopyInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface TrustProductsProvisionalCopyContextSolution {
    trustProductSid: string;
}
export declare class TrustProductsProvisionalCopyContextImpl implements TrustProductsProvisionalCopyContext {
    protected _version: V1;
    protected _solution: TrustProductsProvisionalCopyContextSolution;
    protected _uri: string;
    constructor(_version: V1, trustProductSid: string);
    create(callback?: (error: Error | null, item?: TrustProductsProvisionalCopyInstance) => any): Promise<TrustProductsProvisionalCopyInstance>;
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TrustProductsProvisionalCopyInstance>) => any): Promise<ApiResponse<TrustProductsProvisionalCopyInstance>>;
    fetch(callback?: (error: Error | null, item?: TrustProductsProvisionalCopyInstance) => any): Promise<TrustProductsProvisionalCopyInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TrustProductsProvisionalCopyInstance>) => any): Promise<ApiResponse<TrustProductsProvisionalCopyInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): TrustProductsProvisionalCopyContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface TrustProductsProvisionalCopyResource {
    trust_product_sid: string;
    account_sid: string;
    policy_sid: string;
    friendly_name: string;
    status: string;
    email: string;
    status_callback: string;
    valid_until: Date;
    date_created: Date;
    date_updated: Date;
    url: string;
}
export declare class TrustProductsProvisionalCopyInstance {
    protected _version: V1;
    protected _solution: TrustProductsProvisionalCopyContextSolution;
    protected _context?: TrustProductsProvisionalCopyContext;
    constructor(_version: V1, payload: TrustProductsProvisionalCopyResource, trustProductSid?: string);
    /**
     * The unique SID identifier of the Trust Product.
     */
    trustProductSid: string;
    /**
     * The unique SID identifier of the Account.
     */
    accountSid: string;
    /**
     * The unique SID identifier of the Policy.
     */
    policySid: string;
    /**
     * A human readable description of this resource, up to 64 characters.
     */
    friendlyName: string;
    /**
     * The verification status of the Customer-Profile resource.
     */
    status: string;
    /**
     * The email address that will receive updates when the trust product resource changes status.
     */
    email: string;
    /**
     * The URL we call to inform your application of status changes.
     */
    statusCallback: string;
    /**
     * The date and time in GMT in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format when the resource will be valid until.
     */
    validUntil: Date;
    /**
     * The date that this Trust Products Provisional Copy was created, given in ISO 8601 format.
     */
    dateCreated: Date;
    /**
     * The date that this Trust Products Provisional Copy was updated, given in ISO 8601 format.
     */
    dateUpdated: Date;
    /**
     * The URL of this resource.
     */
    url: string;
    private get _proxy();
    /**
     * Create a TrustProductsProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance
     */
    create(callback?: (error: Error | null, item?: TrustProductsProvisionalCopyInstance) => any): Promise<TrustProductsProvisionalCopyInstance>;
    /**
     * Create a TrustProductsProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TrustProductsProvisionalCopyInstance>) => any): Promise<ApiResponse<TrustProductsProvisionalCopyInstance>>;
    /**
     * Fetch a TrustProductsProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance
     */
    fetch(callback?: (error: Error | null, item?: TrustProductsProvisionalCopyInstance) => any): Promise<TrustProductsProvisionalCopyInstance>;
    /**
     * Fetch a TrustProductsProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed TrustProductsProvisionalCopyInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<TrustProductsProvisionalCopyInstance>) => any): Promise<ApiResponse<TrustProductsProvisionalCopyInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        trustProductSid: string;
        accountSid: string;
        policySid: string;
        friendlyName: string;
        status: string;
        email: string;
        statusCallback: string;
        validUntil: Date;
        dateCreated: Date;
        dateUpdated: Date;
        url: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export interface TrustProductsProvisionalCopySolution {
}
export interface TrustProductsProvisionalCopyListInstance {
    _version: V1;
    _solution: TrustProductsProvisionalCopySolution;
    _uri: string;
    (trustProductSid: string): TrustProductsProvisionalCopyContext;
    get(trustProductSid: string): TrustProductsProvisionalCopyContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function TrustProductsProvisionalCopyListInstance(version: V1): TrustProductsProvisionalCopyListInstance;
export {};
