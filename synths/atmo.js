/**
 * ATMO - Basic digital pluck/harp synth.
 */
class Atmo {
    constructor(pool) {
        this.core = new Tone.PolySynth(6, Tone.MonoSynth).toMaster();
        this.patch = {
            frequency: "C4",
            detune: 12,
            oscillator: {
                type: "sawtooth"
            },
            filter: {
                Q: 2,
                type: "lowpass",
                rolloff: -24
            },
            envelope: {
                attack:  0.6,
                decay:   0.1,
                release: 1.2
            },
            filterEnvelope: {
                attack:  0.6,
                decay:   0.1,
                release: 1.2,
                baseFrequency: 520,
                octaves: 2
            }
        }
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

    // Set cutoff point of envelope while staying in sane bounds
    adjustFilterFreq(freq) {
        const mappedFreq = map(freq, 0, 1000, 400, 2400);
        this.core.set("filterEnvelope.baseFrequency", mappedFreq);
    }

    // Route the output signal to the fs sends
    routeTo(fxRack, reverbGain, echoGain) {
        this.core.send(fxRack.reverbChanName, reverbGain);
        this.core.send(fxRack.echoChanName,   echoGain);
    }
}