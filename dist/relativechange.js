/* relativechange.js 1.0.0 (http://github.com/albertboada) 
 * Copyright (c) 2013 Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * Licensed under MIT. */ 
 
/**
 * @lib     RelativeChange
 *
 * @version 1.0.0
 * @link    https://github.com/albertboada/relativechange.js
 * @author  Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * @license MIT
 *
 * This library aims to solve relative quantity change calculations and its
 * conversions to all its possible forms (raw, percentage and multiplier).
 *
 * A relative change tells how big is the alteration we have to apply to
 * an "initial" quantity, relative to itself, in order to transform it into a
 * "final" quantity.
 *
 * In other words, if we apply the relative change to the "initial" quantity,
 * and add the resulting quantity to the "initial" quantity, we get the "final"
 * quantity.
 *
 * final = initial + (initial * relativechange) = initial * change_multiplier
 *
 * relativechange = (final - initial) / initial
 * [or relativechange = (final / initial) - 1]
 * change_percentage = relativechange * 100
 * change_multiplier = 1 + relativechange
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
 */

(function (window) {

/**
 * @class   RawRelativeChange
 *
 * @version 1.0.0
 * @link    https://github.com/albertboada/relativechange.js
 * @author  Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * @license MIT
 *
 * <example>
 * 50 => 200 = 3
 * 200 => 50 = -0.75
 * </example>
 */
function RawRelativeChange()
{
    var _value = null;

    this.setValue = function (/*Number */change)
    {
        _value = change;
    }

    /**
     * Returns the raw relative change value
     * @return {Number}
     */
    this.val = function ()
    {
        return _value;
    };

    /**
     * Returns the corresponding relative change percentage
     * @return {PercentageRelativeChange}
     */
    this.percentage = function ()
    {
        return PercentageRelativeChange.fromRaw(_value);
    };

    /**
     * Returns the corresponding relative change multiplier
     * @return {MultiplierRelativeChange}
     */
    this.multiplier = function ()
    {
        return MultiplierRelativeChange.fromRaw(_value);
    };
}

/**
 * Creates a new RawRelativeChange instance from an initial quantity and a final
 * quantity.
 *
 * @param  {Number} initial
 * @param  {Number} final
 * @return {RawRelativeChange}
 */
RawRelativeChange.calculate = function (/*Number */initial, /*Number */final)
{
    var instance = new RawRelativeChange();
    instance.setValue(_calculate(initial, final));

    function _calculate(initial, final)
    {
        var d, relchange;

        d = final - initial;
        relchange = d / initial;

        return relchange;
    }

    return instance;
};

/**
 * Creates a new RawRelativeChange instance from an already calculated numeric
 * raw relative change value.
 *
 * @param  {Number} raw
 * @return {RawRelativeChange}
 */
RawRelativeChange.fromRaw = function (/*Number */raw)
{
    var instance = new RawRelativeChange();
    instance.setValue(raw);
    return instance;
};

/**
 * Creates a new RawRelativeChange instance from an already calculated numeric
 * relative change percentage value.
 *
 * @param  {Number} percentage
 * @return {RawRelativeChange}
 */
RawRelativeChange.fromPercentage= function (/*Number */percentage)
{
    return RawRelativeChange.fromRaw(percentage / 100);
};

/**
 * Creates a new RawRelativeChange instance from an already calculated numeric
 * relative change multiplier value.
 *
 * @param  {Number} multiplier
 * @return {RawRelativeChange}
 */
RawRelativeChange.fromMultiplier = function (/*Number */multiplier)
{
    return RawRelativeChange.fromRaw(multiplier - 1);
};

/**
 * @class   PercentageRelativeChange
 *
 * @version 1.0.0
 * @link    https://github.com/albertboada/relativechange.js
 * @author  Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * @license MIT
 *
 * <example>
 * 50 => 200 = +300%
 * 200 => 50 = -75%
 * </example>
 */
function PercentageRelativeChange()
{
    var _value = null;

    this.setValue = function (/*Number */percentage)
    {
        _value = percentage;
    }

    /**
     * Returns the relative change percentage value
     * @return {Number}
     */
    this.val = function ()
    {
        return _value;
    };

    /**
     * Returns the corresponding raw relative change
     * @return {RawRelativeChange}
     */
    this.raw = function ()
    {
        return RawRelativeChange.fromPercentage(_value);
    };

    /**
     * Returns the corresponding relative change multiplier
     * @return {MultiplierRelativeChange}
     */
    this.multiplier = function ()
    {
        return MultiplierRelativeChange.fromPercentage(_value);
    };
}

/**
 * Creates a new PercentageRelativeChange instance from an initial quantity and
 * a final quantity.
 *
 * @param  {Number} initial
 * @param  {Number} final
 * @return {PercentageRelativeChange}
 */
PercentageRelativeChange.calculate = function (/*Number */initial, /*Number */final)
{
    return RawRelativeChange.calculate(initial, final).percentage();
};

/**
 * Creates a new PercentageRelativeChange instance from an already calculated
 * numeric relative change percentage value.
 *
 * @param  {Number} percentage
 * @return {PercentageRelativeChange}
 */
PercentageRelativeChange.fromPercentage = function (/*Number */percentage)
{
    var instance = new PercentageRelativeChange();
    instance.setValue(percentage);
    return instance;
};

/**
 * Creates a new PercentageRelativeChange instance from an already calculated
 * numeric raw relative change value.
 *
 * @param  {Number} raw
 * @return {PercentageRelativeChange}
 */
PercentageRelativeChange.fromRaw = function (/*Number */raw)
{
    return PercentageRelativeChange.fromPercentage(raw * 100);
};

/**
 * Creates a new PercentageRelativeChange instance from an already calculated
 * numeric relative change multiplier value.
 *
 * @param  {Number} multiplier
 * @return {PercentageRelativeChange}
 */
PercentageRelativeChange.fromMultiplier = function (/*Number */multiplier)
{
    return RawRelativeChange.fromMultiplier(multiplier).percentage();
};

/**
 * @class   MultiplierRelativeChange
 *
 * @version 1.0.0
 * @link    https://github.com/albertboada/relativechange.js
 * @author  Albert Boada Flaquer < albert.boada.flaquer at gmail dot com >
 * @license MIT
 *
 * <example>
 * 50 => 200 = x4
 * 200 => 50 = x0.25
 * </example>
 */
function MultiplierRelativeChange()
{
    var _value = null;

    this.setValue = function (/*Number */multiplier)
    {
        _value = multiplier;
    }

    /**
     * Returns the relative change multiplier value
     * @return {Number}
     */
    this.val = function ()
    {
        return _value;
    };

    /**
     * Returns the corresponding raw relative change
     * @return {RawRelativeChange}
     */
    this.raw = function ()
    {
        return RawRelativeChange.fromMultiplier(_value);
    };

    /**
     * Returns the corresponding relative change percentage
     * @return {PercentageRelativeChange}
     */
    this.percentage = function ()
    {
        return PercentageRelativeChange.fromMultiplier(_value);
    };
}

/**
 * Creates a new MultiplierRelativeChange instance from an initial quantity and
 * a final quantity.
 *
 * @param  {Number} initial
 * @param  {Number} final
 * @return {MultiplierRelativeChange}
 */
MultiplierRelativeChange.calculate = function (/*Number */initial, /*Number */final)
{
    return RawRelativeChange.calculate(initial, final).multiplier();
};

/**
 * Creates a new MultiplierRelativeChange instance from an already calculated
 * numeric relative change multiplier value.
 *
 * @param  {Number} multiplier
 * @return {MultiplierRelativeChange}
 */
MultiplierRelativeChange.fromMultiplier = function (/*Number */multiplier)
{
    var instance = new MultiplierRelativeChange();
    instance.setValue(multiplier);
    return instance;
};

/**
 * Creates a new MultiplierRelativeChange instance from an already calculated
 * numeric raw relative change value.
 *
 * @param  {Number} raw
 * @return {MultiplierRelativeChange}
 */
MultiplierRelativeChange.fromRaw = function (/*Number */change)
{
    return MultiplierRelativeChange.fromMultiplier(change + 1);
};

/**
 * Creates a new MultiplierRelativeChange instance from an already calculated
 * numeric relative change percentage value.
 *
 * @param  {Number} percentage
 * @return {MultiplierRelativeChange}
 */
MultiplierRelativeChange.fromPercentage = function (/*Number */percentage)
{
    return RawRelativeChange.fromPercentage(percentage).multiplier();
};

/**
 * @module RelativeChange
 * Wrapper module which publishes our lib classes to the global scope.
 */
window.RelativeChange = {
    Raw:        RawRelativeChange,
    Percentage: PercentageRelativeChange,
    Multiplier: MultiplierRelativeChange
};

} (window));