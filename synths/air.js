/**
 * AIR - basic digital pad synth.
 */
class Air {
    constructor(pool) {
        this.core = new Tone.PolySynth(8, Tone.MonoSynth).toMaster();
        this.patch = {
            frequency: "C4",
            detune: 0,
            oscillator: {
                type: "square"
            },
            filter: {
                Q: 1,
                type: "lowpass",
                rolloff: -24
            },
    
            envelope: {
                attack: 0.7,
                decay: 1.0,
                release: 3.0
            },
    
            filterEnvelope: {
                attack: 0.7,
                decay: 1.0,
                release: 3.0,
                baseFrequency: 600,
                octaves: 4
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
        const mappedFreq = map(freq, 0, 1000, 600, 2000);
        this.core.set("filterEnvelope.baseFrequency", mappedFreq);
    }

    // Route the output signal to the fs sends
    routeTo(fxRack, reverbGain, echoGain) {
        this.core.send(fxRack.reverbChanName, reverbGain);
        this.core.send(fxRack.echoChanName,   echoGain);
    }
}
