System.register(['angular2/platform/browser', 'angular2/http', './flugsuchen.component', 'rxjs/add/operator/map'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, http_1, flugsuchen_component_1;
    var service;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (flugsuchen_component_1_1) {
                flugsuchen_component_1 = flugsuchen_component_1_1;
            },
            function (_1) {}],
        execute: function() {
            service = [
                http_1.HTTP_PROVIDERS
            ];
            browser_1.bootstrap(flugsuchen_component_1.FlugSuchenComponent, service);
        }
    }
});
//# sourceMappingURL=main.js.map