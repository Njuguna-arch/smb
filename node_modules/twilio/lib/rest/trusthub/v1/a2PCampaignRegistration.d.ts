import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
export declare class TrusthubV1A2pCampaignRegistrationRequest {
    /**
     * The legacy Twilio A2P Brand SID (BN-prefixed) for the brand this campaign is registered under. This is a different identifier from the `id` returned by the Initialize Brand endpoint (which is formatted as `tri1.us1.account.AC.../registration.BU...`). Retrieve the BN brand SID via [GET /v1/a2p/BrandRegistrations/{Sid}](https://www.twilio.com/docs/messaging/api/brand-registration-resource) on `messaging.twilio.com`.
     */
    "a2pBrandRegistrationSid": string;
    /**
     * The SID of the Messaging Service.
     */
    "messagingServiceSid"?: string;
    /**
     * Theme ID for styling the inquiry form.
     */
    "themeSetId"?: string;
    /**
     * The categories of the messaging use case.
     */
    "useCaseCategories"?: Array<string>;
    /**
     * A description of the messaging use case.
     */
    "useCaseDescription"?: string;
    /**
     * A sample message for the use case.
     */
    "useCaseSampleMessage1"?: string;
    /**
     * A second sample message for the use case.
     */
    "useCaseSampleMessage2"?: string;
    /**
     * A third sample message for the use case.
     */
    "useCaseSampleMessage3"?: string;
    /**
     * A fourth sample message for the use case.
     */
    "useCaseSampleMessage4"?: string;
    /**
     * A fifth sample message for the use case.
     */
    "useCaseSampleMessage5"?: string;
    /**
     * The opt-in methods for the use case.
     */
    "useCaseOptInTypes"?: Array<string>;
    /**
     * A description of the opt-in process.
     */
    "useCaseOptInDescription"?: string;
    /**
     * Whether messages will contain embedded links.
     */
    "hasEmbeddedLinks"?: boolean;
    /**
     * Whether messages will contain embedded phone numbers.
     */
    "hasEmbeddedPhone"?: boolean;
    /**
     * A sample URL that will be embedded in messages (must use https://).
     */
    "embeddedUrlSample"?: string;
    /**
     * Whether the campaign involves direct lending.
     */
    "directLending"?: boolean;
    /**
     * Whether the content is age-gated.
     */
    "ageGated"?: boolean;
    /**
     * The URL to the privacy policy.
     */
    "privacyPolicyUrl"?: string;
    /**
     * The URL to the terms and conditions.
     */
    "termsAndConditionsUrl"?: string;
    /**
     * Keywords users can text to opt in.
     */
    "optInKeywords"?: Array<string>;
    /**
     * A sample opt-in confirmation message.
     */
    "optInMessageSample"?: string;
    /**
     * Keywords users can text to opt out.
     */
    "optOutKeywords"?: Array<string>;
    /**
     * A sample opt-out confirmation message.
     */
    "optOutMessageSample"?: string;
    /**
     * Keywords users can text for help.
     */
    "helpKeywords"?: Array<string>;
    /**
     * A sample help message.
     */
    "helpMessageSample"?: string;
    constructor(payload: any);
}
/**
 * Options to pass to create a A2PCampaignRegistrationInstance
 */
export interface A2PCampaignRegistrationListInstanceCreateOptions {
    /**  */
    trusthubV1A2PCampaignRegistrationRequest: TrusthubV1A2pCampaignRegistrationRequest;
}
export interface A2PCampaignRegistrationSolution {
}
export interface A2PCampaignRegistrationListInstance {
    _version: V1;
    _solution: A2PCampaignRegistrationSolution;
    _uri: string;
    /**
     * Create a A2PCampaignRegistrationInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PCampaignRegistrationInstance
     */
    create(params: TrusthubV1A2pCampaignRegistrationRequest, headers?: any, callback?: (error: Error | null, item?: A2PCampaignRegistrationInstance) => any): Promise<A2PCampaignRegistrationInstance>;
    /**
     * Create a A2PCampaignRegistrationInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PCampaignRegistrationInstance with HTTP metadata
     */
    createWithHttpInfo(params: TrusthubV1A2pCampaignRegistrationRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<A2PCampaignRegistrationInstance>) => any): Promise<ApiResponse<A2PCampaignRegistrationInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function A2PCampaignRegistrationListInstance(version: V1): A2PCampaignRegistrationListInstance;
interface A2PCampaignRegistrationResource {
    id: string;
    sessionId: string;
    sessionToken: string;
}
export declare class A2PCampaignRegistrationInstance {
    protected _version: V1;
    constructor(_version: V1, payload: A2PCampaignRegistrationResource);
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
