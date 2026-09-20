import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
export declare class TrusthubV1A2pBrandRegistrationRequest {
    /**
     * The type of brand being registered.
     */
    "brandType": string;
    /**
     * Theme ID for styling the inquiry form.
     */
    "themeSetId"?: string;
    /**
     * A human-readable name for the brand registration.
     */
    "friendlyName"?: string;
    /**
     * The email address to receive notifications about the registration.
     */
    "notificationEmail": string;
    /**
     * The legal name of the business.
     */
    "businessName"?: string;
    /**
     * The authority with which the business is registered.
     */
    "businessRegistrationAuthority"?: string;
    /**
     * The business registration number (e.g., EIN, CBN, ACN). Maximum 21 characters.
     */
    "businessRegistrationNumber"?: string;
    /**
     * The industry of the business.
     */
    "businessIndustry"?: string;
    /**
     * The business website URL (must use https://).
     */
    "businessWebsite"?: string;
    /**
     * The type of business entity.
     */
    "businessType"?: string;
    /**
     * The stock symbol for publicly traded companies.
     */
    "businessStockSymbol"?: string;
    /**
     * The stock exchange where the business is listed.
     */
    "businessStockExchange"?: string;
    /**
     * Nonprofit/political organization tax-exempt status per the U.S. tax code (e.g. 501c3, 501c1, 527). A value of 527 (political organization) requires a Campaign Verify token in brandExternalVettingToken.
     */
    "businessTaxExemptStatus"?: string;
    /**
     * Campaign Verify token for externally vetted brands.
     */
    "brandExternalVettingToken"?: string;
    /**
     * The street address of the business.
     */
    "businessStreetAddress"?: string;
    /**
     * Additional street address information.
     */
    "businessStreetAddress2"?: string;
    /**
     * The city of the business.
     */
    "businessCity"?: string;
    /**
     * The state, province, or region of the business.
     */
    "businessStateProvinceRegion"?: string;
    /**
     * The postal code of the business.
     */
    "businessPostalCode"?: string;
    /**
     * The two-letter ISO country code of the business.
     */
    "businessCountry"?: string;
    /**
     * The first name of the business contact.
     */
    "businessContactFirstName"?: string;
    /**
     * The last name of the business contact.
     */
    "businessContactLastName"?: string;
    /**
     * The email address of the business contact.
     */
    "businessContactEmail"?: string;
    /**
     * The phone number of the business contact in E.164 format.
     */
    "businessContactPhone"?: string;
    /**
     * The email address for authorized contact verification.
     */
    "authorizedContactVerificationEmail"?: string;
    /**
     * The mobile phone number for authorized contact in E.164 format.
     */
    "authorizedContactMobilePhoneNumberE164"?: string;
    /**
     * Whether this is a test brand registration.
     */
    "isTest"?: boolean;
    /**
     * Whether to skip automatic secondary vetting.
     */
    "skipAutomaticSecVet"?: boolean;
    constructor(payload: any);
}
/**
 * Options to pass to create a A2PBrandRegistrationInstance
 */
export interface A2PBrandRegistrationListInstanceCreateOptions {
    /**  */
    trusthubV1A2PBrandRegistrationRequest: TrusthubV1A2pBrandRegistrationRequest;
}
export interface A2PBrandRegistrationSolution {
}
export interface A2PBrandRegistrationListInstance {
    _version: V1;
    _solution: A2PBrandRegistrationSolution;
    _uri: string;
    /**
     * Create a A2PBrandRegistrationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PBrandRegistrationInstance
     */
    create(params: TrusthubV1A2pBrandRegistrationRequest, headers?: any, callback?: (error: Error | null, item?: A2PBrandRegistrationInstance) => any): Promise<A2PBrandRegistrationInstance>;
    /**
     * Create a A2PBrandRegistrationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PBrandRegistrationInstance with HTTP metadata
     */
    createWithHttpInfo(params: TrusthubV1A2pBrandRegistrationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<A2PBrandRegistrationInstance>) => any): Promise<ApiResponse<A2PBrandRegistrationInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function A2PBrandRegistrationListInstance(version: V1): A2PBrandRegistrationListInstance;
interface A2PBrandRegistrationResource {
    id: string;
    sessionId: string;
    sessionToken: string;
}
export declare class A2PBrandRegistrationInstance {
    protected _version: V1;
    constructor(_version: V1, payload: A2PBrandRegistrationResource);
    /**
     * The unique A2P Brand or Campaign Registration identifier, formatted as `tri1.us1.account.AC.../registration.BU...`.
     */
    id: string;
    /**
     * The Persona inquiry ID used to start the embedded compliance session.
     */
    sessionId: string;
    /**
     * The Persona session token for embedding the compliance UI. Expires in 24 hours.
     */
    sessionToken: string;
    /**
     * Provide a user-friendly representation
     *
     * @returns Object
     */
    toJSON(): {
        id: string;
        sessionId: string;
        sessionToken: string;
    };
    [inspect.custom](_depth: any, options: InspectOptions): string;
}
export {};
