import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {FlugSuchenComponent} from './flugsuchen.component';
import 'rxjs/add/operator/map';

var service = [
    HTTP_PROVIDERS
];

bootstrap(FlugSuchenComponent, service);
