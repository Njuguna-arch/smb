import { inspect, InspectOptions } from "util";
import V3 from "../V3";
import { ApiResponse } from "../../../base/ApiResponse";
export declare class CreateRuleExecutionRequest {
    /**
     * The Intelligence Configuration identifier to execute the Rule within.
     */
    "intelligenceConfigurationId": string;
    /**
     * The rule identifier to execute within the selected Intelligence Configuration.
     */
    "ruleId": string;
    /**
     * The Conversation identifier to execute the Rule against.
     */
    "conversationId": string;
    constructor(payload: any);
}
/**
 * Options to pass to create a RuleExecutionInstance
 */
export interface RuleExecutionListInstanceCreateOptions {
    /**  */
    createRuleExecutionRequest: CreateRuleExecutionRequest;
}
export interface RuleExecutionSolution {
}
export interface RuleExecutionListInstance {
    _version: V3;
    _solution: RuleExecutionSolution;
    _uri: string;
    /**
     * Create a RuleExecutionInstance
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RuleExecutionInstance
     */
    create(params: CreateRuleExecutionRequest, headers?: any, callback?: (error: Error | null, item?: void) => any): Promise<void>;
    /**
     * Create a RuleExecutionInstance and return HTTP info
     *
     * @param params - Body for request
     * @param headers - header params for request
     * @param callback - Callback to handle processed record
     *
     * @returns Resolves to processed RuleExecutionInstance with HTTP metadata
     */
    createWithHttpInfo(params: CreateRuleExecutionRequest, headers?: any, callback?: (error: Error | null, item?: ApiResponse<void>) => any): Promise<ApiResponse<void>>;
    /**
     * Provide a user-friendly representation
     */
    toJSON(): any;
    [inspect.custom](_depth: any, options: InspectOptions): any;
}
export declare function RuleExecutionListInstance(version: V3): RuleExecutionListInstance;
