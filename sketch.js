let field;
let w, h;

let canvas;
let canvasContainer;
let guiContainer;
let upperPortals, lowerPortals;

let yellowPortalAdd;
let purplePortalAdd;
let greenPortalAdd;
let warmWhitePortalAdd;

let yellowPortalRemove;
let purplePortalRemove;
let greenPortalRemove;
let warmWhitePortalRemove;

let switchScaleButton;
let scaleState = 0;

let mucoBanner;
let mucoHeader;
let mucoText;

let infoBox;
let audioContextHint;

function setup() {
    guiContainer = createElement('div').addClass('gui-container');
    canvasContainer = createElement('div').addClass('canvas-container');

    w = map(windowWidth, 50, 1000, 300, 400);
    h = map(windowHeight, 50, 800, 400, 500);
    canvas = createCanvas(w, h);
    canvas.parent(canvasContainer);
 
    // Prompt for action if the audio context is suspended
    if (Tone.context.state !== 'running') {
        infoBox = createElement('div')
            .position(w/2, h/2)
            .addClass('info-box');
        
        audioContextHint = createElement('p', "Click me to enable sound.")
            .addClass('info-text')
            .parent(infoBox);

        infoBox.mouseClicked(enableAudioContext);
    }

    // Create upper portals
    upperPortals = createElement('div').addClass('upper-portals');

    yellowPortalAdd = createElement('div').addClass('upper-yellow-portal');
    yellowPortalAdd.mousePressed(addYellowParticle);
    yellowPortalAdd.parent(upperPortals);

    purplePortalAdd = createElement('div').addClass('upper-purple-portal');
    purplePortalAdd.mousePressed(addPurpleParticle);
    purplePortalAdd.parent(upperPortals);

    greenPortalAdd = createElement('div').addClass('upper-green-portal');
    greenPortalAdd.mousePressed(addGreenParticle);
    greenPortalAdd.parent(upperPortals);

    warmWhitePortalAdd = createElement('div').addClass('upper-warmWhite-portal');
    warmWhitePortalAdd.mousePressed(addWarmWhiteParticle);
    warmWhitePortalAdd.parent(upperPortals);

    // Create lower portals
    lowerPortals = createElement('div').addClass('lower-portals');
    lowerPortals.position(w-100, h+50);

    yellowPortalRemove = createElement('div').addClass('lower-yellow-portal');
    yellowPortalRemove.mousePressed(removeYellowParticle);
    yellowPortalRemove.parent(lowerPortals);

    purplePortalRemove = createElement('div').addClass('lower-purple-portal');
    purplePortalRemove.mousePressed(removePurpleParticle);
    purplePortalRemove.parent(lowerPortals);

    greenPortalRemove = createElement('div').addClass('lower-green-portal');
    greenPortalRemove.mousePressed(removeGreenParticle);
    greenPortalRemove.parent(lowerPortals);

    warmWhitePortalRemove = createElement('div').addClass('lower-warmWhite-portal');
    warmWhitePortalRemove.mousePressed(removeWarmWhiteParticle);
    warmWhitePortalRemove.parent(lowerPortals);

    // Add button to switch scale
    switchScaleButton = createElement('div').addClass('switch-scale-button');
    switchScaleButton.mousePressed(changeScale);
    switchScaleButton.mouseOver(glow);
    switchScaleButton.mouseOut(setColor);
    switchScaleButton.position(w+30, 60);
    setColor();

    // Add Banner with text
    mucoBanner = createElement('div').addClass('muco-banner');
    mucoBanner.position(w + 30, h - 114);
    mucoHeader = createElement('div').addClass('muco-header');
    mucoHeader.parent(mucoBanner);
    mucoHeader.html('Muco').addClass('muco-header');
    mucoText = createElement('div').addClass('muco-text');
    mucoText.html('A Music generating particle system. ', true);
    mucoText.html('Made by Navaneeth K M', true);
    mucoText.parent(mucoBanner);

    guiContainer.child(canvasContainer);
    guiContainer.child(upperPortals);
    guiContainer.child(lowerPortals);
    guiContainer.child(switchScaleButton);
    guiContainer.child(mucoBanner);

    // Create Particle Field
    field = new Field(10, 10, w-30, h-20);

}

function draw() {
    background(255);
    field.run();
}

function addYellowParticle() {
    field.addParticle("yellow");
}

function addPurpleParticle() {
    field.addParticle("purple");
}

function addGreenParticle() {
    field.addParticle("green");
}

function addWarmWhiteParticle() {
    field.addParticle("warmwhite");
}

function removeYellowParticle() {
    field.removeParticle("yellow");
}

function removePurpleParticle() {
    field.removeParticle("purple");
}

function removeGreenParticle() {
    field.removeParticle("green");
}

function removeWarmWhiteParticle() {
    field.removeParticle("warmwhite");
}

function changeScale() {
    if (scaleState < 3) {
        scaleState += 1;
    } else {
        scaleState = 0;
    }

    switch (scaleState) {
    case 0: {
        field.particleSystem.ensemble.fillNewPools(a4PentMin);
        break;
    }
    case 1: {
        field.particleSystem.ensemble.fillNewPools(d3PentMin);
        break;
    }
    case 2: {
        field.particleSystem.ensemble.fillNewPools(c4PentMaj);
        break;
    }
    default: {
        field.particleSystem.ensemble.fillNewPools(f3PentMaj);
        break;
    }
    }

    setColor();
}

function setColor() {
    switch (scaleState) {
    case 0: {
        const col = color(243, 165, 183);
        switchScaleButton.style('border-color', col);
        switchScaleButton.style('color', col);
        switchScaleButton.html('1');
        break;
    }
    case 1: {
        const col = color(133, 131, 255);
        switchScaleButton.style('border-color', col);
        switchScaleButton.style('color', col);
        switchScaleButton.html('2');
        break;
    }
    case 2: {
        const col = color(192, 172, 165);
        switchScaleButton.style('border-color', col);
        switchScaleButton.style('color', col);
        switchScaleButton.html('3');
        break;
    }
    default: {
        const col = color(163, 120, 212);
        switchScaleButton.style('border-color', col);
        switchScaleButton.style('color', col);
        switchScaleButton.html('4');
    }
    }
}

function glow() {
    switch (scaleState) {
    case 0: {
        const col = color(238, 124, 150);
        switchScaleButton.style('border-color', col);
        break;
    }
    case 1: {
        const col = color(79, 77, 255);
        switchScaleButton.style('border-color', col);
        break;
    }
    case 2: {
        const col = color(171, 144, 135);
        switchScaleButton.style('border-color', col);
        break;
    }
    default: {
        const col = color(123, 61, 194);
        switchScaleButton.style('border-color', col);
    }
    }
}

function enableAudioContext() {
    audioContextHint.remove();
    infoBox.remove();
    Tone.context.resume();
}
