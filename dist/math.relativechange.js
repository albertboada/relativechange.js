/* math.relativechange.js (http://github.com/albertboada) 
 * Copyright (c) 2013 Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * Licensed under MIT. */ 
 
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

if (!Math.relativechange) {

    /**
     * Math.relativechange
     *
     * Calculates the change needed for transforming an "initial" quantity into
     * a "final" quantity, relative to the "initial".
     * In other words, if we apply the resulting change to the "initial"
     * quantity, we get the "final" quantity.
     *
     * relativechange = (final - initial) / initial
     * [or relativechange = (final / initial) - 1]
     * change_percentage = relativechange * 100
     * change_multiplier = 1 + relativechange
     * check: final = initial + (initial * relativechange) = initial * change_multiplier
     *
     * Example 1 (positive change):
     * <example>
     * initial = 70, final = 140
     * relativechange = (140 - 70) / 70 = 1
     * change_percentage = 1 * 100 = +100%
     * change_multiplier = 1 + 1 = 2
     * check: final = 70 + (70 * 1) = 70 * 2 = 140   :)
     * </example>
     *
     * Example 2 (negative change):
     * <example>
     * initial = 140, final = 70
     * relativechange = (70 - 140) / 140 = -0.5
     * change_percentage = -0.5 * 100 = -50%
     * change_multiplier = 1 + -0.5 = 0.5
     * check: final = 140 + (140 * -0.5) = 140 * 0.5 = 70   :)
     * </example>
     *
     * @param  {float}  initial Value we want to transform. Change will be
     *                          relative to this value.
     * @param  {float}  final   Value we want "initial" to be transformed to.
     * @param  {string} format  Indicates the response's format (raw, percent,
     *                          multiplier or all of them).
     *
     * @return {float|pojo} The relative change value.
     *                      Can be positive or negative (+/-). Depending on the
     *                      "format" arg, it will be the raw change value, a
     *                      change percentage, a change multiplier, or all of
     *                      them wrapped in a POJO.
     *
     */
    Math.relativechange = function (initial, final, format)
    {
        var format = typeof format != "undefined" ? format : "raw",
            d,
            relativechange,
            response;

        d = final - initial;
        relativechange = d / initial;

        //or change_factor = (final / initial) - 1

        switch (format) {
            case "percent":
                response = to_percent(relativechange);
                break;
            case "multiplier":
                response = to_multiplier(relativechange);
                break;
            case "all":
                response = {
                    "raw"        : relativechange,
                    "percent"    : to_percent(relativechange),
                    "multiplier" : to_multiplier(relativechange)
                };
                break;
            case "raw":
            default:
                response = relativechange;
                break;
        }

        return response;
    }

    function to_percent(relativechange)
    {
        return relativechange * 100;
    }

    function to_multiplier(relativechange)
    {
        return 1 + relativechange;
    }
}

} (window.Math));