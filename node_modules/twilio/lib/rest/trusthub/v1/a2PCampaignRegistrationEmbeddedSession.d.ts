import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
export interface A2PCampaignRegistrationEmbeddedSessionSolution {
    id: string;
}
export interface A2PCampaignRegistrationEmbeddedSessionListInstance {
    _version: V1;
    _solution: A2PCampaignRegistrationEmbeddedSessionSolution;
    _uri: string;
    /**
     * Create a A2PCampaignRegistrationEmbeddedSessionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PCampaignRegistrationEmbeddedSessionInstance
     */
    create(callback?: (error: Error | null, item?: A2PCampaignRegistrationEmbeddedSessionInstance) => any): Promise<A2PCampaignRegistrationEmbeddedSessionInstance>;
    /**
     * Create a A2PCampaignRegistrationEmbeddedSessionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PCampaignRegistrationEmbeddedSessionInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<A2PCampaignRegistrationEmbeddedSessionInstance>) => any): Promise<ApiResponse<A2PCampaignRegistrationEmbeddedSessionInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function A2PCampaignRegistrationEmbeddedSessionListInstance(version: V1, id: string): A2PCampaignRegistrationEmbeddedSessionListInstance;
interface A2PCampaignRegistrationEmbeddedSessionResource {
    id: string;
    sessionId: string;
    sessionToken: string;
}
export declare class A2PCampaignRegistrationEmbeddedSessionInstance {
    protected _version: V1;
    constructor(_version: V1, payload: A2PCampaignRegistrationEmbeddedSessionResource, id?: string);
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
