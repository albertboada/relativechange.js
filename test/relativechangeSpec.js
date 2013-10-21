describe("relativechange.js lib", function () {
    var tests_data = [
        { ini: 100, fin: 400, chng: 3,     pctg: 300, mltplr: 4 },
        { ini: 400, fin: 100, chng: -0.75, pctg: -75, mltplr: 0.25 },
        { ini: 100, fin: 100, chng: 0,     pctg: 0,   mltplr: 1 },
        { ini: 1,   fin: 2,   chng: 1,     pctg: 100, mltplr: 2 },
        { ini: 5,   fin: 2.5, chng: -0.5,  pctg: -50, mltplr: 0.5 }
    ];

    function _testloop(callback) {
        for (var i=0; i<tests_data.length; i++) {
            var t = tests_data[i];
            callback(t);
        }
    }

    describe("RawRelativeChange:", function () {
        it("should exist in global scope", function () {
            expect(RelativeChange.Raw).toBeDefined();
        });
        it("initial & final values -> RelativeChange", function () {
            _testloop(function (t) {
                expect(RelativeChange.Raw.calculate(t.ini, t.fin).val()).toEqual(t.chng);
            });
        });
        it("raw change value -> RelativeChange", function () {
            var change = tests_data[0].change;
            console.log(RelativeChange.Raw)
            expect(RelativeChange.Raw.fromRaw(change).val()).toEqual(change);
        });
        it("percentage value -> RelativeChange", function () {
            _testloop(function (t) {
                expect(RelativeChange.Raw.fromPercentage(t.pctg).val()).toEqual(t.chng);
            });
        });
        it("multiplier value -> RelativeChange", function () {
            _testloop(function (t) {
                expect(RelativeChange.Raw.fromMultiplier(t.mltplr).val()).toEqual(t.chng);
            });
        });
        it("RelativeChange -> RelativeChangePercentage", function () {
            _testloop(function (t) {
                expect(RelativeChange.Raw.calculate(t.ini, t.fin).percentage().val()).toEqual(t.pctg);
            });
        });
        it("RelativeChange -> RelativeChangeMultiplier", function () {
            _testloop(function (t) {
                expect(RelativeChange.Raw.calculate(t.ini, t.fin).multiplier().val()).toEqual(t.mltplr);
            });
        });
    });

    describe("PercentageRelativeChange:", function () {
        it("should exist in global scope", function () {
            expect(RelativeChange.Percentage).toBeDefined();
        });
        it("initial & final values -> RelativeChangePercentage", function () {
            _testloop(function (t) {
                expect(RelativeChange.Percentage.calculate(t.ini, t.fin).val()).toEqual(t.pctg);
            });
        });
        it("percentage value -> RelativeChangePercentage", function () {
            var percentage = tests_data[0].percentage;
            expect(RelativeChange.Percentage.fromPercentage(percentage).val()).toEqual(percentage);
        });
        it("raw change value -> RelativeChangePercentage", function () {
            _testloop(function (t) {
                expect(RelativeChange.Percentage.fromRaw(t.chng).val()).toEqual(t.pctg);
            });
        });
        it("multiplier value -> RelativeChangePercentage", function () {
            _testloop(function (t) {
                expect(RelativeChange.Percentage.fromMultiplier(t.mltplr).val()).toEqual(t.pctg);
            });
        });
        it("RelativeChangePercentage -> RelativeChange", function () {
            _testloop(function (t) {
                expect(RelativeChange.Percentage.calculate(t.ini, t.fin).raw().val()).toEqual(t.chng);
            });
        });
        it("RelativeChangePercentage -> RelativeChangeMultiplier", function () {
            _testloop(function (t) {
                expect(RelativeChange.Percentage.calculate(t.ini, t.fin).multiplier().val()).toEqual(t.mltplr);
            });
        });
    });

    describe("MultiplierRelativeChange:", function () {
        it("should exist in global scope", function () {
            expect(RelativeChange.Multiplier).toBeDefined();
        });
        it("initial & final values -> RelativeChangeMultiplier", function () {
            _testloop(function (t) {
                expect(RelativeChange.Multiplier.calculate(t.ini, t.fin).val()).toEqual(t.mltplr);
            });
        });
        it("multiplier value -> RelativeChangeMultiplier", function () {
            var multiplier = tests_data[0].multiplier;
            expect(RelativeChange.Multiplier.fromMultiplier(multiplier).val()).toEqual(multiplier);
        });
        it("raw change value -> RelativeChangeMultiplier", function () {
            _testloop(function (t) {
                expect(RelativeChange.Multiplier.fromRaw(t.chng).val()).toEqual(t.mltplr);
            });
        });
        it("percentage value -> RelativeChangeMultiplier", function () {
            _testloop(function (t) {
                expect(RelativeChange.Multiplier.fromPercentage(t.pctg).val()).toEqual(t.mltplr);
            });
        });
        it("RelativeChangeMultiplier -> RelativeChange", function () {
            _testloop(function (t) {
                expect(RelativeChange.Multiplier.calculate(t.ini, t.fin).raw().val()).toEqual(t.chng);
            });
        });
        it("RelativeChangeMultiplier -> RelativeChangePercentage", function () {
            _testloop(function (t) {
                expect(RelativeChange.Multiplier.calculate(t.ini, t.fin).percentage().val()).toEqual(t.pctg);
            });
        });
    });
});