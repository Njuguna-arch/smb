import VoiceBase from "../VoiceBase";
import Version from "../../base/Version";
import { AccountDefaultConfigurationListInstance } from "./v2/accountDefaultConfiguration";
import { ConfigurationListInstance } from "./v2/configuration";
import { RecordingListInstance } from "./v2/recording";
import { TranscriptionListInstance } from "./v2/transcription";
import { TypeListInstance } from "./v2/type";
export default class V2 extends Version {
    /**
     * Initialize the V2 version of Voice
     *
     * @param domain - The Twilio (Twilio.Voice) domain
     */
    constructor(domain: VoiceBase);
    /** accountDefaultConfiguration - { Twilio.Voice.V2.AccountDefaultConfigurationListInstance } resource */
    protected _accountDefaultConfiguration?: AccountDefaultConfigurationListInstance;
    /** configurations - { Twilio.Voice.V2.ConfigurationListInstance } resource */
    protected _configurations?: ConfigurationListInstance;
    /** recording - { Twilio.Voice.V2.RecordingListInstance } resource */
    protected _recording?: RecordingListInstance;
    /** transcription - { Twilio.Voice.V2.TranscriptionListInstance } resource */
    protected _transcription?: TranscriptionListInstance;
    /** type - { Twilio.Voice.V2.TypeListInstance } resource */
    protected _type?: TypeListInstance;
    /** Getter for accountDefaultConfiguration resource */
    get accountDefaultConfiguration(): AccountDefaultConfigurationListInstance;
    /** Getter for configurations resource */
    get configurations(): ConfigurationListInstance;
    /** Getter for recording resource */
    get recording(): RecordingListInstance;
    /** Getter for transcription resource */
    get transcription(): TranscriptionListInstance;
    /** Getter for type resource */
    get type(): TypeListInstance;
}
