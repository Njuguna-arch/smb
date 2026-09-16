import TrusthubBase from "../TrusthubBase";
import Version from "../../base/Version";
import { A2PBrandRegistrationListInstance } from "./v1/a2PBrandRegistration";
import { A2PBrandRegistrationEmbeddedSessionListInstance } from "./v1/a2PBrandRegistrationEmbeddedSession";
import { A2PCampaignRegistrationListInstance } from "./v1/a2PCampaignRegistration";
import { A2PCampaignRegistrationEmbeddedSessionListInstance } from "./v1/a2PCampaignRegistrationEmbeddedSession";
import { ComplianceInquiriesListInstance } from "./v1/complianceInquiries";
import { ComplianceRegistrationInquiriesListInstance } from "./v1/complianceRegistrationInquiries";
import { ComplianceTollfreeInquiriesListInstance } from "./v1/complianceTollfreeInquiries";
import { CustomerProfilesListInstance } from "./v1/customerProfiles";
import { CustomerProfilesProvisionalCopyListInstance } from "./v1/customerProfilesProvisionalCopy";
import { EndUserListInstance } from "./v1/endUser";
import { EndUserTypeListInstance } from "./v1/endUserType";
import { PoliciesListInstance } from "./v1/policies";
import { SupportingDocumentListInstance } from "./v1/supportingDocument";
import { SupportingDocumentTypeListInstance } from "./v1/supportingDocumentType";
import { TrustProductsListInstance } from "./v1/trustProducts";
import { TrustProductsProvisionalCopyListInstance } from "./v1/trustProductsProvisionalCopy";
export default class V1 extends Version {
    /**
     * Initialize the V1 version of Trusthub
     *
     * @param domain - The Twilio (Twilio.Trusthub) domain
     */
    constructor(domain: TrusthubBase);
    /** a2PBrandRegistrations - { Twilio.Trusthub.V1.A2PBrandRegistrationListInstance } resource */
    protected _a2PBrandRegistrations?: A2PBrandRegistrationListInstance;
    /** a2PCampaignRegistrations - { Twilio.Trusthub.V1.A2PCampaignRegistrationListInstance } resource */
    protected _a2PCampaignRegistrations?: A2PCampaignRegistrationListInstance;
    /** complianceInquiries - { Twilio.Trusthub.V1.ComplianceInquiriesListInstance } resource */
    protected _complianceInquiries?: ComplianceInquiriesListInstance;
    /** complianceRegistrationInquiries - { Twilio.Trusthub.V1.ComplianceRegistrationInquiriesListInstance } resource */
    protected _complianceRegistrationInquiries?: ComplianceRegistrationInquiriesListInstance;
    /** complianceTollfreeInquiries - { Twilio.Trusthub.V1.ComplianceTollfreeInquiriesListInstance } resource */
    protected _complianceTollfreeInquiries?: ComplianceTollfreeInquiriesListInstance;
    /** customerProfiles - { Twilio.Trusthub.V1.CustomerProfilesListInstance } resource */
    protected _customerProfiles?: CustomerProfilesListInstance;
    /** customerProfilesProvisionalCopy - { Twilio.Trusthub.V1.CustomerProfilesProvisionalCopyListInstance } resource */
    protected _customerProfilesProvisionalCopy?: CustomerProfilesProvisionalCopyListInstance;
    /** endUsers - { Twilio.Trusthub.V1.EndUserListInstance } resource */
    protected _endUsers?: EndUserListInstance;
    /** endUserTypes - { Twilio.Trusthub.V1.EndUserTypeListInstance } resource */
    protected _endUserTypes?: EndUserTypeListInstance;
    /** policies - { Twilio.Trusthub.V1.PoliciesListInstance } resource */
    protected _policies?: PoliciesListInstance;
    /** supportingDocuments - { Twilio.Trusthub.V1.SupportingDocumentListInstance } resource */
    protected _supportingDocuments?: SupportingDocumentListInstance;
    /** supportingDocumentTypes - { Twilio.Trusthub.V1.SupportingDocumentTypeListInstance } resource */
    protected _supportingDocumentTypes?: SupportingDocumentTypeListInstance;
    /** trustProducts - { Twilio.Trusthub.V1.TrustProductsListInstance } resource */
    protected _trustProducts?: TrustProductsListInstance;
    /** trustProductsProvisionalCopy - { Twilio.Trusthub.V1.TrustProductsProvisionalCopyListInstance } resource */
    protected _trustProductsProvisionalCopy?: TrustProductsProvisionalCopyListInstance;
    /** Getter for a2PBrandRegistrations resource */
    get a2PBrandRegistrations(): A2PBrandRegistrationListInstance;
    /** Accessor for a2PBrandRegistrationEmbeddedSessions resource */
    a2PBrandRegistrationEmbeddedSessions(Id: string): A2PBrandRegistrationEmbeddedSessionListInstance;
    /** Getter for a2PCampaignRegistrations resource */
    get a2PCampaignRegistrations(): A2PCampaignRegistrationListInstance;
    /** Accessor for a2PCampaignRegistrationEmbeddedSessions resource */
    a2PCampaignRegistrationEmbeddedSessions(Id: string): A2PCampaignRegistrationEmbeddedSessionListInstance;
    /** Getter for complianceInquiries resource */
    get complianceInquiries(): ComplianceInquiriesListInstance;
    /** Getter for complianceRegistrationInquiries resource */
    get complianceRegistrationInquiries(): ComplianceRegistrationInquiriesListInstance;
    /** Getter for complianceTollfreeInquiries resource */
    get complianceTollfreeInquiries(): ComplianceTollfreeInquiriesListInstance;
    /** Getter for customerProfiles resource */
    get customerProfiles(): CustomerProfilesListInstance;
    /** Getter for customerProfilesProvisionalCopy resource */
    get customerProfilesProvisionalCopy(): CustomerProfilesProvisionalCopyListInstance;
    /** Getter for endUsers resource */
    get endUsers(): EndUserListInstance;
    /** Getter for endUserTypes resource */
    get endUserTypes(): EndUserTypeListInstance;
    /** Getter for policies resource */
    get policies(): PoliciesListInstance;
    /** Getter for supportingDocuments resource */
    get supportingDocuments(): SupportingDocumentListInstance;
    /** Getter for supportingDocumentTypes resource */
    get supportingDocumentTypes(): SupportingDocumentTypeListInstance;
    /** Getter for trustProducts resource */
    get trustProducts(): TrustProductsListInstance;
    /** Getter for trustProductsProvisionalCopy resource */
    get trustProductsProvisionalCopy(): TrustProductsProvisionalCopyListInstance;
}
