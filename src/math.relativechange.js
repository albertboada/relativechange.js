/**
 * Extends the Javascript Math object by adding a method for calculating
 * relative quantity changes.
 *
 * @author  Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * @version 1.0.0
 * @link    https://github.com/albertboada
 * @license MIT
 */

(function (Math) {

/**
 * Calculates the change percentage needed for transforming an "initial"
 * quantity into a "final" quantity, relative to the "initial".
 * In other words, if we apply the resulting change percentage to the
 * "initial" quantity, we get the "final" quantity.
 *
 * change_factor = (final - initial) / initial
 * [or change_factor = (final / initial) - 1]
 * change_percentage = change_factor * 100
 * check: final = initial + (initial * change_factor) = initial * (1 + change_factor)
 *
 * Example 1 (positive change):
 * <example>
 * initial = 70, final = 140
 * change_factor = (140 - 70) / 70 = 1
 * change_percentage = 1 * 100 = +100%
 * check: final = 70 * (1 + 1) = 140   :)
 * </example>
 *
 * Example 2 (negative change):
 * <example>
 * initial = 140, final = 70
 * change_factor = (70 - 140) / 140 = -0.5
 * change_percentage = -0.5 * 100 = -50%
 * check: final = 140 * (1 + -0.5) = 140 * (1 - 0.5) = 70   :)
 * </example>
 *
 * @param  {float} initial Value we want to transform. Change will be
 *                        relative to this value.
 * @param  {float} final  Value we want "initial" to be transformed to.
 *
 * @return {float} Change percentage, relative to "initial". Can be positive
 *                 or negative (+/-).
 */
function relativechange(initial, final)
{
    var d,
        change_factor,
        change_percentage;

    d = final - initial;
    change_factor = d / initial;

    //change_factor = (final / initial) - 1

    change_percentage = change_factor * 100;

    return change_percentage;
}

if (!Math.relativechange) {
    Math.relativechange = relativechange;
}

} (window.Math));