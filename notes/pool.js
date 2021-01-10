/**
 * A pool is a collection of notes
 * from which a random one can be chosen.
 */
class Pool {
    // n:=octDown|octUp to add nth octave to pool 
    constructor(scale, octDown = 0, octUp = 0) {
        this.notes = scale;

        if (octDown !== 0) {
            const lowerNotes = this.notes
                .map((n) => {
                    return new Tone.Frequency(n).transpose(12*(-1*octDown)).toNote()
                });
            this.notes.unshift(...lowerNotes);
            
        }
        if (octUp !== 0) {
            const upperNotes = this.notes
                .map((n) => {
                    return new Tone.Frequency(n).transpose(12*octUp).toNote()
                });
            this.notes.push(...upperNotes);
        }
    }

    /**
     * Construct a new pool by transposing every note.
     * @returns Pool the new pool 
     */
    transpose(semiTones) {
        return new Pool(
            this.notes.map((n) => new Tone.Frequency(n).transpose(semiTones).toNote()));
    }

    /**
     * Return a random note from the pool.
     * @returns string The note in music. notation
     */
    randomChoice() {
        return this.notes[Math.floor(Math.random()*this.notes.length)]
    }
}