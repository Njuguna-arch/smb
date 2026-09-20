import { inspect, InspectOptions } from "util";
import V1 from "../V1";
import { ApiResponse } from "../../../base/ApiResponse";
export interface A2PBrandRegistrationEmbeddedSessionSolution {
    id: string;
}
export interface A2PBrandRegistrationEmbeddedSessionListInstance {
    _version: V1;
    _solution: A2PBrandRegistrationEmbeddedSessionSolution;
    _uri: string;
    /**
     * Create a A2PBrandRegistrationEmbeddedSessionInstance
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PBrandRegistrationEmbeddedSessionInstance
     */
    create(callback?: (error: Error | null, item?: A2PBrandRegistrationEmbeddedSessionInstance) => any): Promise<A2PBrandRegistrationEmbeddedSessionInstance>;
    /**
     * Create a A2PBrandRegistrationEmbeddedSessionInstance and return HTTP info
     *
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed A2PBrandRegistrationEmbeddedSessionInstance with HTTP metadata
     */
    createWithHttpInfo(callback?: (error: Error | null, item?: ApiResponse<A2PBrandRegistrationEmbeddedSessionInstance>) => any): Promise<ApiResponse<A2PBrandRegistrationEmbeddedSessionInstance>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function A2PBrandRegistrationEmbeddedSessionListInstance(version: V1, id: string): A2PBrandRegistrationEmbeddedSessionListInstance;
interface A2PBrandRegistrationEmbeddedSessionResource {
    id: string;
    sessionId: string;
    sessionToken: string;
}
export declare class A2PBrandRegistrationEmbeddedSessionInstance {
    protected _version: V1;
    constructor(_version: V1, payload: A2PBrandRegistrationEmbeddedSessionResource, id?: string);
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
