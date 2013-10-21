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
