import IntelligenceBase from "../IntelligenceBase";
import Version from "../../base/Version";
import { ConfigurationListInstance } from "./v3/configuration";
import { ConversationListInstance } from "./v3/conversation";
import { OperatorListInstance } from "./v3/operator";
import { OperatorResultListInstance } from "./v3/operatorResult";
import { RuleExecutionListInstance } from "./v3/ruleExecution";
import { VersionListInstance, VersionContext } from "./v3/version";
export default class V3 extends Version {
    /**
     * Initialize the V3 version of Intelligence
     *
     * @param domain - The Twilio (Twilio.Intelligence) domain
     */
    constructor(domain: IntelligenceBase);
    /** configurations - { Twilio.Intelligence.V3.ConfigurationListInstance } resource */
    protected _configurations?: ConfigurationListInstance;
    /** conversations - { Twilio.Intelligence.V3.ConversationListInstance } resource */
    protected _conversations?: ConversationListInstance;
    /** operators - { Twilio.Intelligence.V3.OperatorListInstance } resource */
    protected _operators?: OperatorListInstance;
    /** operatorResults - { Twilio.Intelligence.V3.OperatorResultListInstance } resource */
    protected _operatorResults?: OperatorResultListInstance;
    /** ruleExecutions - { Twilio.Intelligence.V3.RuleExecutionListInstance } resource */
    protected _ruleExecutions?: RuleExecutionListInstance;
    /** Getter for configurations resource */
    get configurations(): ConfigurationListInstance;
    /** Getter for conversations resource */
    get conversations(): ConversationListInstance;
    /** Getter for operators resource */
    get operators(): OperatorListInstance;
    /** Getter for operatorResults resource */
    get operatorResults(): OperatorResultListInstance;
    /** Getter for ruleExecutions resource */
    get ruleExecutions(): RuleExecutionListInstance;
    /** Accessor for versions resource - list operations */
    versions(id: string): VersionListInstance;
    /** Accessor for versions resource - instance operations */
    versions(id: string, version: number): VersionContext;
}
