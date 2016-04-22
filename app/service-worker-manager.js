System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ServiceWorkerManager;
    return {
        setters:[],
        execute: function() {
            ServiceWorkerManager = (function () {
                function ServiceWorkerManager() {
                }
                ServiceWorkerManager.prototype.install = function () {
                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.register('/sw.js', { scope: '/' })
                            .then(function (registration) {
                            console.log("Service Worker Registered");
                        });
                        navigator.serviceWorker.ready.then(function (registration) {
                            console.log("Service Worker Ready");
                        });
                    }
                };
                return ServiceWorkerManager;
            }());
            exports_1("ServiceWorkerManager", ServiceWorkerManager);
        }
    }
});
//# sourceMappingURL=service-worker-manager.js.map