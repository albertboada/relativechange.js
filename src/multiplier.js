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
