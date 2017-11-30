import Moment from 'moment';
/* Singleton Desing for single fetch point for all data */
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
        const raceNum = 20;
        const meetingNum = 3;
        const maxCompetitorNum = 6;
        const timeInterval = 300;
        this.races = this.seedRaces(raceNum,meetingNum,maxCompetitorNum,timeInterval);
        this.meeting = this.seedMeeting(meetingNum);
    }

    getRaces(){
        return this.races;
    }
    getRace(id){
        for(var i = 0 ; i < this.races.length;++i){
                if(this.races[i].id === id){
                    return this.races[i];        
                }
        }
    }
    seedMeeting(seedNum){
        var seedData = [];
        for(var i = 1 ; i <= seedNum ;i++) {
            var option = Math.trunc(Math.random()*3);
            var course = "";
            switch(option){
                case 0: course = "Thoroughbred";
                break;
                case 1: course = "Greyhounds";
                break;
                case 2: course = "Harness";
                break;
                default: course = "Harness";
                break;
            }
            seedData.push({
                name : "Meeting Name " + i,
                course : course,
                id:i
            });
        }  
        return seedData;        
    }

    getMeeting(id){
        
        for(var i = 0 ; i < this.meeting.length;++i){
            if(this.meeting[i].id === id){
                return this.meeting[i];        
            }
        }
        console.log(this.meeting);
    }

    seedRaces(raceNum,meetingNum,competitorNum,maxTimeInterval) {
        var seedData = [];
        for(var i = 1 ; i <= raceNum ;i++) {
            seedData.push({
                id:i,
                name:"Race " + i,
                closing_time: Moment().add(Math.random() * maxTimeInterval,'second'),
                meetingID:Math.trunc(Math.random()*meetingNum),
                competitors:this.seedCompetitor(competitorNum)
            });
        }
        return seedData    
    }

    seedCompetitor(seedNum) {
        var competitors = [];
        var maxNumCompetitor = 4+Math.trunc(Math.random()*seedNum);
        for(var i = 0;i <= maxNumCompetitor;i++){
            competitors.push({
                name:"Competitor "+i,
                id: 1+i
            });
        }
        return competitors;
    }
}
export default DataStore;