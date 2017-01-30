var INKA;
(function (INKA) {
    var LoadWhat;
    (function (LoadWhat) {
        LoadWhat[LoadWhat["None"] = 0] = "None";
        LoadWhat[LoadWhat["TabReady"] = 1] = "TabReady";
        LoadWhat[LoadWhat["StepReady"] = 2] = "StepReady";
        LoadWhat[LoadWhat["SplitLeft"] = 3] = "SplitLeft";
        LoadWhat[LoadWhat["SplitRight"] = 4] = "SplitRight";
    })(LoadWhat = INKA.LoadWhat || (INKA.LoadWhat = {}));
    var ReloadHow;
    (function (ReloadHow) {
        ReloadHow[ReloadHow["None"] = 0] = "None";
        ReloadHow[ReloadHow["WindowReload"] = 1] = "WindowReload";
        ReloadHow[ReloadHow["Redirect"] = 2] = "Redirect";
        ReloadHow[ReloadHow["OpenTab"] = 3] = "OpenTab";
        ReloadHow[ReloadHow["OpenStep"] = 4] = "OpenStep";
        ReloadHow[ReloadHow["OpenSplitLeft"] = 5] = "OpenSplitLeft";
        ReloadHow[ReloadHow["OpenSplitRight"] = 6] = "OpenSplitRight";
    })(ReloadHow = INKA.ReloadHow || (INKA.ReloadHow = {}));
})(INKA || (INKA = {}));
//# sourceMappingURL=INKA.Enums.js.map