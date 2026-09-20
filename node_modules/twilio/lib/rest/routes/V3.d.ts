import RoutesBase from "../RoutesBase";
import Version from "../../base/Version";
import { PhoneNumberListInstance } from "./v3/phoneNumber";
export default class V3 extends Version {
    /**
     * Initialize the V3 version of Routes
     *
     * @param domain - The Twilio (Twilio.Routes) domain
     */
    constructor(domain: RoutesBase);
    /** phoneNumbers - { Twilio.Routes.V3.PhoneNumberListInstance } resource */
    protected _phoneNumbers?: PhoneNumberListInstance;
    /** Getter for phoneNumbers resource */
    get phoneNumbers(): PhoneNumberListInstance;
}
