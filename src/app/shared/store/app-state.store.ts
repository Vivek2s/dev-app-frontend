import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

interface STATE_DATA {
    key: String,
    data: any,
}

@Injectable()
export class AppStateStore {

    
    storage = new BehaviorSubject<STATE_DATA[]>([]);
    request_from: string = "";
    changes = this.storage.asObservable().pipe( distinctUntilChanged() ).subscribe(changes=> changes);

    constructor() { }

    getState() {
        return this.storage.value;
    }

    setState(data:STATE_DATA){
        let currentState = this.getState();
        currentState.push(data);
        this.storage.next(currentState);
	}

	addItem(item){
		this.storage.value.unshift(item);
    }

    getStateByKey(key){
        return this.storage.value.find(st=> st['key'] == key);
    }

    getRequestForm(){
        return this.request_from;
    }

    // setData(routeData:ROUTE_DATA){
    //     let storage = this.storage.value.find(st=> st['key'] === 'key');
    //     if(storage) storage.data = Object.assign({},storage.data,routeData.data);
    //     else this.storage.value.push(routeData);
    // }

    // updateData(routeData: ROUTE_DATA){
    //     let storage = this.storage.find(st=> st.route === routeData.route);
    //     if(storage && storage.data)
    //         storage.data = routeData.data;
    //     else
    //         this.storage.push(routeData);
    // }

    // deleteRoute(route){
    //    this.storage =  this.storage.filter(st=> st.route !== route);
    // }
    
}