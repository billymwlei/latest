import Moment from 'moment';

class DataStore {
    static instance = null;
    static createInstance() {
        var object = new DataStore();
        return object;
    }
  
    static getInstance () {
        if (!DataStore.instance) {
            DataStore.instance = DataStore.createInstance();
        }
        return DataStore.instance;
    }

    constructor(){
        this.races = this.seed(20);
    }

    getRace(){
        return this.races;
    }

    seed(seedNum) {
        var seedData = [];
        for(var i = 1 ; i <= seedNum ;i++) {
            seedData.push({
                name:"Race " + i,
                closing_time: Moment().add(Math.random() * 10,'minute')
            });
        }
        return seedData    
    }
}
export default DataStore;