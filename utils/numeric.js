/**
 * Utility functions for various
 * numerical needs.
 */

// A strict version of p5.map()
// Always restricts the return value to the given range.
function strictMap(val, oldMin, oldMax, newMin, newMax) {
    let newVal = val;
    if (val < oldMin) {
        newVal = oldMin;
    } else if (val > oldMax) {
        newVal = oldMax;
    }
    return map(newVal, oldMin, oldMax, newMin, newMax);
}

/**
 * Like 'toFixed', but returning a float.
 */
function toFixedFloat(value, precision) {
    var power = Math.pow(10, precision || 0);
    return Math.round(value * power) / power;
}