import React, { Component } from 'react';
import { Row,Col,ListGroup,ListGroupItem } from 'reactstrap';
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
        const unsortedRaces = DataStore.getInstance().getRaces();
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

    btnClick(race)
    {        
        this.props.history.push({
            pathname: '/detail',
            state:{ raceID:race.id}
        });
     }

    render() {
        return(
            <div>
             {this.state.date}
            <ListGroup>
                 {
                this.state.raceDisplay.map( (race,i) => (                
                    <ListGroupItem onClick={()=> this.btnClick(race) } >
                        <Row>
                            <Col xs={1}></Col>
                            <Col xs={3}>{race.name} </Col>
                            <Col xs={4}> { Moment(race.closing_time.diff(this.state.currentMoment)).format('mm:ss')}</Col>  
                            <Col xs={1}></Col>
                        </Row>
                    </ListGroupItem>
                    ))
                }
            </ListGroup>
            </div>

        );
    }        
}    

export default List;