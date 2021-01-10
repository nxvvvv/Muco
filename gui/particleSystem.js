/**
 * Handling particles, their interactions
 * and the consequences of such interactions. :)
 */
class ParticleSystem {
    constructor(num, x, y, w, h) {
        this.minX = x;
        this.maxX = x + w;
        this.minY = y;
        this.maxY = y + h;
        this.origin = createVector(x + w / 2, y + h / 2);
        this.particles = [];
        for (let i = 0; i < num; i++) {
            // Initialize partciles with a random location
            const newLocation = createVector(random(this.minX, this.maxX), random(this.minY, this.maxY));
            const newType = ParticleSystem.chooseType();
            this.particles.push(new Particle(newLocation, newType));
        }
        this.hit = false;

        // Trigger musical events with an ensemble
        this.ensemble = new Ensemble(a4PentMin);
    }

    // Which particle type will be generated?
    static chooseType() {
        // TODO: find a better way to choose type
        const rand = random(20);
        if (rand < 4) {
            return "yellow";
        } else if (rand < 8) {
            return "purple";
        } else if (rand < 18) {
            return "warmwhite";
        }
        return "green";
    }

    // Add a particle of a given type to the particle system
    addParticle(type) {
        // const newType = ParticleSystem.chooseType();
        if (this.particles.length < 40) {
            this.particles.push(new Particle(this.origin, type));
        }
    }

    // Remove particles of a given type
    removeParticle(type) {
        // TODO: Be able to delete a specific particle
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].type == type) {
                this.particles.splice(i,1);
                break;
            }
        }
        // this.particles.shift();
    }

    // Move the particles
    run() {
        for (const particle of this.particles) {
            particle.checkBorders(this.minX, this.maxX, this.minY, this.maxY);
            particle.run();

            const index = this.particles.indexOf(particle);
            this.detectCollision(index);
        }
    }

    // Check collision and act upon it
    detectCollision(startIndex) {
        const p1 = this.particles[startIndex];
        for (let j = startIndex + 1; j < this.particles.length; j++) {
            const p2 = this.particles[j];

            // Check if particles Collide
            this.hit = collideCircleCircle(p1.location.x, p1.location.y, p1.size, p2.location.x, p2.location.y, p2.size);
            if (this.hit && ParticleSystem.distanceWillDecrease(p1, p2)) {
                
                // We got a collision!
                // Decide which synth to trigger

                // Workaround for quirky Web Audio context handling in safari
                if (Tone.context.state == 'running') {
                    switch (String(p1.type)) {
                        case "yellow":
                            this.ensemble.atmo.playFromPool(0.15);
                            break;
                        case "purple":
                            this.ensemble.air.playFromPool(0.15);
                            break;
                        case "green":
                            this.ensemble.cloud.playFromPool(0.1);
                            break;
                        case "warmwhite":
                            this.ensemble.haze.playFromPool(0.075);
                            break;                 
                    }
                }

                // Switch velocities
                const oldVelocity = p1.velocity.copy();
                p1.velocity = p2.velocity.copy();
                p2.velocity = oldVelocity.copy();
            }
        }
    }

    // Interpolate velocty of a particle to 
    // a "key-press" velocity between: [0.1, 0.25]
    static physVelocityToAudioVelocity(particle) {
        // Determine force of impact
        const impactStrength = particle.velocity.mag();
        const impactStrengthMapped = strictMap(impactStrength, 0, 2.0, 0.1, 0.25);
        
        return toFixedFloat(impactStrengthMapped, 2);
    }

    static distanceWillDecrease(p1, p2) {
        // Calculate current distance of the two Particles p1 and p2
        const linkVector = p5.Vector.sub(p2.location, p1.location);
        const distance = p5.Vector.mag(linkVector);

        // Calculate their future distance, to determine if they move away or towards each other
        const p1FutureLoc = p5.Vector.add(p1.location, p1.velocity);
        const p2FutureLoc = p5.Vector.add(p2.location, p2.velocity);

        const futureLinkVector = p5.Vector.sub(p2FutureLoc, p1FutureLoc);
        const futureDistance = p5.Vector.mag(futureLinkVector);

        if (futureDistance - distance > 0) {
            // Particles move away from each other
            return false;
        }

        return true;
    }
}