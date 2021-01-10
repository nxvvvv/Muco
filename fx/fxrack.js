/**
 * An FXRack is an effects unit which
 * provides two send busses.
 */
class FXRack {
    constructor() {
        this.reverbChanName = "fverb";
        this.echoChanName   = "echo";

        this.fverb = new Tone.Freeverb(0.98, 4000)
            .receive(this.reverbChanName)
            .toMaster();

        this.echo = new Tone.PingPongDelay(0.8, 0.75)
            .receive(this.echoChanName)
            .toMaster();

        this.vibrato = new Tone.Vibrato(1.0, 0.3)
            .receive("vibrato")
            .toMaster();
    }

    /**
     * Change gain of reverb.
     * @param int new decibel value
     */
    setReverbGain(db) {
        this.fverb.gain.value = db;
    }

    /**
     * Send echo signal through a slight
     * vibrato. This emulates a "tap-y"
     * analog style delay.
     */
    activateTapeDelay() {
        this.echo.connect(this.vibrato);
    }
}