/**
 * The ensemble abstracts over the studio setup
 * composed of synths, effect units, send busses
 * and scores the synths are programmed to play.
 */
class Ensemble {
    constructor(scale) {
        // Construct pools for every synth from the scale
        const atmoPool  = new Pool(scale, 0, 1);
        const airPool   = atmoPool.transpose(-7);
        const cloudPool = atmoPool.transpose(-36);
        const hazePool  = atmoPool.transpose(12);

        // Init the synths with their respective pools
        this.atmo  = new Atmo(atmoPool);
        this.air   = new Air(airPool);
        this.cloud = new Cloud(cloudPool);
        this.haze  = new Haze(hazePool);

        // Init the fx send busses
        this.fxRack = new FXRack();
        this.fxRack.activateTapeDelay();

        this.atmo.routeTo(this.fxRack,  -28, -16);
        this.air.routeTo(this.fxRack,   -36, -24);
        this.cloud.addReverb(this.fxRack,    -36);
        this.haze.routeTo(this.fxRack,  -28, -16);
    }

    // Fill new pools based on a new scale
    fillNewPools(newScale) {
        const newScaleCopy = newScale.slice(0);

        const newAtmoPool  = new Pool(newScaleCopy, 0, 1);
        const newAirPool   = newAtmoPool.transpose(-7);
        const newCloudPool = newAtmoPool.transpose(-36);
        const newHazePool  = newAtmoPool.transpose(12);

        this.atmo.notePool  = newAtmoPool;
        this.air.notePool   = newAirPool;
        this.cloud.notePool = newCloudPool;
        this.haze.notePool  = newHazePool;
    }

    // Adjust cutoff frequencies of every synth
    adjustFilterFreqs(val) {
        this.atmo.adjustFilterFreq(val);
        this.air.adjustFilterFreq(val);
        this.cloud.adjustFilterFreq(val);
        this.haze.adjustFilterFreq(val);
    }
}