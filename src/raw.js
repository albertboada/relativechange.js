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
