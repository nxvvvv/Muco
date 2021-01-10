/**
 * CLOUD - digital bass monosynth.
 */
class Cloud {
    constructor(pool) {
        this.core = new Tone.MonoSynth().toMaster();
        this.patch = {
            frequency: "C4",
            detune: 0,
            oscillator: {
                type: "square"
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
                release: 5.5
            },
            filterEnvelope: {
                attack: 0.3,
                decay: 0.2,
                sustain: 0.01,
                release: 5.0,
                baseFrequency: 100,
                octaves: 1,
                exponent: 2
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
        const mappedFreq = map(freq, 0, 1000, 200, 450);
        this.core.set("filterEnvelope.baseFrequency", mappedFreq);
    }

    // Route output signal to reverb channel
    addReverb(fxRack, reverbGain) {
        this.core.send(fxRack.reverbChanName, reverbGain);
    }
}