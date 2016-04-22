import { Component, OnInit, ChangeDetectorRef } from 'angular2/core';
import { Http, URLSearchParams, Headers} from 'angular2/http';
import { Buchung} from './buchung';
import { ServiceWorkerManager} from './service-worker-manager';
import { NavBarComponent} from './navbar.component';



@Component({
    selector: 'flug-suchen', // <my-app></my-app>
    templateUrl: 'app/flugsuchen.component.html',
    styleUrls: ['app/flugsuchen.component.css'],
    directives: [NavBarComponent],
    providers: [ServiceWorkerManager]
})
export class FlugSuchenComponent implements OnInit {
    
    public buchungen: Array<Buchung> = [];
    
    constructor(
        private http: Http,
        private serviceWorkerManager: ServiceWorkerManager,
        private changeDetectionRef: ChangeDetectorRef) {
    }
    
    ngOnInit() {
        //this.serviceWorkerManager.install();
        this.search();
    }
    
    private hasPendingRequest = false;
    
    search() {
        
        this.hasPendingRequest = true;
         this.searchInWebApi();
         this.searchInCache();
        
    }
    
    searchInWebApi() {
        let url = "http://www.angular.at/api/buchung";
        
        let search = new URLSearchParams();
        search.set('passagierId', '1');
        
        let headers = new Headers();
        headers.set('Accept', 'text/json');        
        
        this.hasPendingRequest = true;
        this.http
            .get(url, { search, headers  })
            .map(resp => resp.json())
            .subscribe(
                (buchungen) => {
                    console.debug("got data via http");
                    this.buchungen = buchungen;
                    this.hasPendingRequest = false;
                },
                (err) => {
                    console.error(err);
                }
            ); // Observable
            
    }
    
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
    
    searchInCache() {
        let url = "http://www.angular.at/api/buchung?passagierId=1";
        if (!('caches' in window)) return;  
        var that = this;
        caches.match(url)
                .then(resp => (resp) ? resp.json() : null)
                .then(buchungen => {
                    if (buchungen && that.hasPendingRequest) {
                        console.debug('cache was faster');
                        that.buchungen = buchungen;
                        that.changeDetectionRef.detectChanges();
                    }
                    else {
                        console.debug('did not use cache!');
                    }    
                });  
    }
    
}