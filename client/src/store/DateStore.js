import {makeAutoObservable} from "mobx";

export default class DateStore{
    constructor(){
        this._dates = []
        let date = new Date();
        for(let i=0;i<30;++i){
            date.setDate(date.getDate() + 1)
            let dayMonth = date.getDate().toString() +"."+   ((date.getMonth()+1) > 9 ? date.getMonth(): "0"+(date.getMonth()+1))
            this._dates.push(dayMonth);
        }
        makeAutoObservable(this)
    }
    setDate(services){
        this._dates = services;
    }
    get Date(){
        return this._dates;
    }
}