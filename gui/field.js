class Field {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.particleSystem = new ParticleSystem(18, x, y, w, h);
    }

    run() {
        this.display();
        this.particleSystem.run();
    }

    display() {
        stroke(255,185,130);
        strokeWeight(3);
        fill(255);
        rect(this.x, this.y, this.w, this.h, 5);
    }
    
    addParticle(type) {
        this.particleSystem.addParticle(type);
    }

    removeParticle(type) {
        this.particleSystem.removeParticle(type);
    }
}