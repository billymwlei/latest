import React, { Component } from 'react';
import { ListGroup,ListGroupItem } from 'reactstrap';
//import { withRouter } from 'react-router-dom';
import Moment from 'moment';
import DataStore from '../model/DataStore'

class List extends Component {
    constructor(props){
        super();
        this.btnClick = this.btnClick.bind(this)

        this.state = {
            count : 0,
            races : [],
            raceDisplay:[]
        }
    }

    componentDidMount() {
        setInterval(this.onInterval, 1000);
        const unsortedRaces = DataStore.getInstance().getRace();
        var sortedRaces = unsortedRaces.sort(function(a,b){
            return a.closing_time.diff(b.closing_time);
        });
        sortedRaces= this.updateList(sortedRaces) ;      
        this.setState ({
            count : 0,            
            races : sortedRaces,
            raceDisplay : sortedRaces.slice(0,5)
        });
  
    }        

    onInterval = () => {
        var updatedRaces =  this.updateList(this.state.races);
        this.setState({
            currentMoment : Moment(),
            races : updatedRaces,
            raceDisplay:updatedRaces.slice(0,5)
        });    
    }

    updateList(races) {
        races = races.filter(race=> {
            return race.closing_time.diff(Moment(),'second') > 0;
        });
        return races;
    }

    btnClick(obj){
        this.props.history.push('/detail');
      }

    render() {
        return(
            <div>
            
             {this.state.date}
             
            <ListGroup>
                 {
                this.state.raceDisplay.map( (race) => (                
                    <ListGroupItem onClick={this.btnClick} >
                        {race.name}  { race.closing_time.diff(this.state.currentMoment,'second')}  
                    </ListGroupItem>
                    ))
                }
            </ListGroup>
            </div>

        );
    }        
}    

export default List;