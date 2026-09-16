import Domain from "../base/Domain";
import V2 from "./routes/V2";
import V3 from "./routes/V3";
declare class RoutesBase extends Domain {
    _v2?: V2;
    _v3?: V3;
    /**
     * Initialize routes domain
     *
     * @param twilio - The twilio client
     */
    constructor(twilio: any);
    get v2(): V2;
    get v3(): V3;
}
export = RoutesBase;
