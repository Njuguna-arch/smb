import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
export interface CustomerProfilesProvisionalCopyContext {
    /**
     * Create a CustomerProfilesProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance
     */
    create(callback?: (error: Error | null, item?: CustomerProfilesProvisionalCopyInstance) => any): Promise<CustomerProfilesProvisionalCopyInstance>;
    /**
     * Create a CustomerProfilesProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<CustomerProfilesProvisionalCopyInstance>) => any): Promise<ApiResponse<CustomerProfilesProvisionalCopyInstance>>;
    /**
     * Fetch a CustomerProfilesProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance
     */
    fetch(callback?: (error: Error | null, item?: CustomerProfilesProvisionalCopyInstance) => any): Promise<CustomerProfilesProvisionalCopyInstance>;
    /**
     * Fetch a CustomerProfilesProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<CustomerProfilesProvisionalCopyInstance>) => any): Promise<ApiResponse<CustomerProfilesProvisionalCopyInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export interface CustomerProfilesProvisionalCopyContextSolution {
    customerProfileSid: string;
}
export declare class CustomerProfilesProvisionalCopyContextImpl implements CustomerProfilesProvisionalCopyContext {
    protected _version: V1;
    protected _solution: CustomerProfilesProvisionalCopyContextSolution;
    protected _uri: string;
    constructor(_version: V1, customerProfileSid: string);
    create(callback?: (error: Error | null, item?: CustomerProfilesProvisionalCopyInstance) => any): Promise<CustomerProfilesProvisionalCopyInstance>;
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<CustomerProfilesProvisionalCopyInstance>) => any): Promise<ApiResponse<CustomerProfilesProvisionalCopyInstance>>;
    fetch(callback?: (error: Error | null, item?: CustomerProfilesProvisionalCopyInstance) => any): Promise<CustomerProfilesProvisionalCopyInstance>;
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<CustomerProfilesProvisionalCopyInstance>) => any): Promise<ApiResponse<CustomerProfilesProvisionalCopyInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): CustomerProfilesProvisionalCopyContextSolution;
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
interface CustomerProfilesProvisionalCopyResource {
    customer_profile_sid: string;
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
export declare class CustomerProfilesProvisionalCopyInstance {
    protected _version: V1;
    protected _solution: CustomerProfilesProvisionalCopyContextSolution;
    protected _context?: CustomerProfilesProvisionalCopyContext;
    constructor(_version: V1, payload: CustomerProfilesProvisionalCopyResource, customerProfileSid?: string);
    /**
     * The unique SID identifier of the Customer Profile.
     */
    customerProfileSid: string;
    /**
     * The unique SID identifier of the Account.
     */
    accountSid: string;
    /**
     * The unique string of a policy that is associated to the Customer-Profile resource.
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
     * The email address that will receive updates when the Customer-Profile resource changes status.
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
     * The date that this Customer Profiles Provisional Copy was created, given in ISO 8601 format.
     */
    dateCreated: Date;
    /**
     * The date that this Customer Profiles Provisional Copy was updated, given in ISO 8601 format.
     */
    dateUpdated: Date;
    /**
     * The URL of this resource.
     */
    url: string;
    private get _proxy();
    /**
     * Create a CustomerProfilesProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance
     */
    create(callback?: (error: Error | null, item?: CustomerProfilesProvisionalCopyInstance) => any): Promise<CustomerProfilesProvisionalCopyInstance>;
    /**
     * Create a CustomerProfilesProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<CustomerProfilesProvisionalCopyInstance>) => any): Promise<ApiResponse<CustomerProfilesProvisionalCopyInstance>>;
    /**
     * Fetch a CustomerProfilesProvisionalCopyInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance
     */
    fetch(callback?: (error: Error | null, item?: CustomerProfilesProvisionalCopyInstance) => any): Promise<CustomerProfilesProvisionalCopyInstance>;
    /**
     * Fetch a CustomerProfilesProvisionalCopyInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed CustomerProfilesProvisionalCopyInstance with HTTP metadata
     */
    fetchWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<CustomerProfilesProvisionalCopyInstance>) => any): Promise<ApiResponse<CustomerProfilesProvisionalCopyInstance>>;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        customerProfileSid: string;
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
export interface CustomerProfilesProvisionalCopySolution {
}
export interface CustomerProfilesProvisionalCopyListInstance {
    _version: V1;
    _solution: CustomerProfilesProvisionalCopySolution;
    _uri: string;
    (customerProfileSid: string): CustomerProfilesProvisionalCopyContext;
    get(customerProfileSid: string): CustomerProfilesProvisionalCopyContext;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function CustomerProfilesProvisionalCopyListInstance(version: V1): CustomerProfilesProvisionalCopyListInstance;
export {};
