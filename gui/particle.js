class Particle {
    constructor(location, type) {
        this.location = location.copy();
        this.velocity = createVector(random(-1,1),random(-1,1));
        this.acceleration = createVector(0, 0.05);
        this.size = 20;
        this.alive = true;
        this.type = type;
    }

    // Display and Update particle
    run() {
        this.update();
        this.display();
    }

    // Update properties
    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        // Clear acceleration
        this.acceleration.mult(0);
    }

    // Display particle on the screen
    display() {
        switch (String(this.type)) {
        case "yellow":
            fill(255, 232, 85);
            break;
        case "purple":
            fill(153, 103, 252);
            break;
        case "green":
            fill(104, 213, 157);
            break;
        case "warmwhite":
            fill(255, 239, 213);
            break;
        }

        noStroke();
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    // The color when a collision has occured will be slightly darker
    // @param number s strength
    // @param number a alpha
    hitColor(s, a) {
        switch (String(this.type)) {
            case "yellow":
                return color(255+s, 232+s, 85+s, a);
            case "purple":
                return color(153+s, 103+s, 252+s, a);
            case "green":
                return color(104+s, 213+s, 157+s, a);
            case "warmwhite":
                return color(255+s, 239+s, 213+s, a);
        }
    }

    // Applies force to the particleation.add()forece;
    applyForce(force) {
        this.acceleration.add(force);
    }
        
    // Makes sure the particle doesn't get out of bounds
    checkBorders(minX, maxX, minY, maxY) {
        const buffer = this.size / 2;
        if (this.location.x > maxX - buffer) {
            this.velocity.x *= -1;
            this.location.x = maxX - buffer;
        }
        if (this.location.x < minX + buffer) {
            this.velocity.x *= -1;
            this.location.x = minX + buffer;
        }
        if (this.location.y > maxY - buffer) {
            this.velocity.y *= -1;
            this.location.y = maxY - buffer;
        }
        if (this.location.y < minY + buffer) {
            this.velocity.y *= -1;
            this.location.y = minY + buffer;
        }
    }

    // Used for deleting the particle
    isDead() {
        if (this.alive) {
            return false;
        } 
        return true;
    }
}
