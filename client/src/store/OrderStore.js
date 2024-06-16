import {makeAutoObservable} from "mobx";

export default class OrderStore{
    constructor(){
        this._clientOrders=[]
        makeAutoObservable(this)
    }
    setClientOrders(clientOrders){
        this._clientOrders = clientOrders;
    }
    get ClientOrders(){
        return this._clientOrders;
    }
}