System.register(['angular2/core', 'angular2/http', './service-worker-manager', './navbar.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, service_worker_manager_1, navbar_component_1;
    var FlugSuchenComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (service_worker_manager_1_1) {
                service_worker_manager_1 = service_worker_manager_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            }],
        execute: function() {
            FlugSuchenComponent = (function () {
                function FlugSuchenComponent(http, serviceWorkerManager, changeDetectionRef) {
                    this.http = http;
                    this.serviceWorkerManager = serviceWorkerManager;
                    this.changeDetectionRef = changeDetectionRef;
                    this.buchungen = [];
                    this.hasPendingRequest = false;
                }
                FlugSuchenComponent.prototype.ngOnInit = function () {
                    //this.serviceWorkerManager.install();
                    this.search();
                };
                FlugSuchenComponent.prototype.search = function () {
                    this.hasPendingRequest = true;
                    this.searchInWebApi();
                    this.searchInCache();
                };
                FlugSuchenComponent.prototype.searchInWebApi = function () {
                    var _this = this;
                    var url = "http://www.angular.at/api/buchung";
                    var search = new http_1.URLSearchParams();
                    search.set('passagierId', '1');
                    var headers = new http_1.Headers();
                    headers.set('Accept', 'text/json');
                    this.hasPendingRequest = true;
                    this.http
                        .get(url, { search: search, headers: headers })
                        .map(function (resp) { return resp.json(); })
                        .subscribe(function (buchungen) {
                        console.debug("got data via http");
                        _this.buchungen = buchungen;
                        _this.hasPendingRequest = false;
                    }, function (err) {
                        console.error(err);
                    }); // Observable
                };
                /*
                searchInCache() {
                    let url = "http://www.angular.at/api/buchung?passagierId=1";
                    var that = this;
                    if ('caches' in window) {
                        caches.match(url).then(function(response) {
                            if (response) {
                                response.json().then(function(buchungen) {
                                    if (that.hasPendingRequest) {
                                        console.log('cache was faster!');
                                        that.buchungen = buchungen;
                                    }
                                    else {
                                        console.log('cache was slower!');
                                    }
                                });
                            }
                        });
                    }
                }
                */
                FlugSuchenComponent.prototype.searchInCache = function () {
                    var url = "http://www.angular.at/api/buchung?passagierId=1";
                    if (!('caches' in window))
                        return;
                    var that = this;
                    caches.match(url)
                        .then(function (resp) { return (resp) ? resp.json() : null; })
                        .then(function (buchungen) {
                        if (buchungen && that.hasPendingRequest) {
                            console.debug('cache was faster');
                            that.buchungen = buchungen;
                            that.changeDetectionRef.detectChanges();
                        }
                        else {
                            console.debug('did not use cache!');
                        }
                    });
                };
                FlugSuchenComponent = __decorate([
                    core_1.Component({
                        selector: 'flug-suchen',
                        templateUrl: 'app/flugsuchen.component.html',
                        styleUrls: ['app/flugsuchen.component.css'],
                        directives: [navbar_component_1.NavBarComponent],
                        providers: [service_worker_manager_1.ServiceWorkerManager]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http, service_worker_manager_1.ServiceWorkerManager, core_1.ChangeDetectorRef])
                ], FlugSuchenComponent);
                return FlugSuchenComponent;
            }());
            exports_1("FlugSuchenComponent", FlugSuchenComponent);
        }
    }
});
//# sourceMappingURL=flugsuchen.component.js.map