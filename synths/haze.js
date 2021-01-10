/**
 * HAZE - Basic digital lead synth.
 */
class Haze {
    constructor(pool) {
        this.core = new Tone.MonoSynth().toMaster();
        this.patch = {
            frequency: "C4",
            detune: 0,
            oscillator: {
                type: "triangle"
            },
            filter: {
                Q: 1,
                type: "lowpass",
                rolloff: -12
            },
            envelope: {
                attack: 0.3,
                decay: 0.2,
                sustain: 0.01,
                release: 2.5
            },
            filterEnvelope: {
                attack: 0.3,
                decay: 0.2,
                sustain: 0.01,
                release: 2.0,
                baseFrequency: 400,
                octaves: 1,
                exponent: 2
            }
        };
        this.core.set(this.patch);
        this.notePool = pool;
    }

    // Play a given note with given velocity
    play(note, velocity) {
        this.core.triggerAttackRelease(note, velocity);
    }

    // Play a random note from the pool with given veloctiy
    playFromPool(velocity) {
        const note = this.notePool.randomChoice();
        this.play(note, velocity);
    }

    adjustFilterFreq(freq) {
        const mappedFreq = map(freq, 0, 1000, 400, 1000);
        this.core.set("filterEnvelope.baseFrequency", mappedFreq);
    }

    // Route the output signal to the fs sends
    routeTo(fxRack, reverbGain, echoGain) {
        this.core.send(fxRack.reverbChanName, reverbGain);
        this.core.send(fxRack.echoChanName,   echoGain);
    }
}