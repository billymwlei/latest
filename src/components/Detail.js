import React, { Component } from 'react';
import { Row,Col,ListGroup,ListGroupItem } from 'reactstrap';
import DataStore from '../model/DataStore'

class Detail extends Component {
  constructor(props) {
    super(props);
    const id = props.location.state.raceID;
    const race = DataStore.getInstance().getRace(id);
    console.log(race.meetingID)
    const meeting = DataStore.getInstance().getMeeting(race.meetingID);
    console.log(meeting)
    
    this.state =  {
      race : race,
      meeting :meeting
    }
  }

  render() {
    return (
        <div>
            <div>
              <h2> Race Name :{this.state.race.name} in {this.state.meeting.name} for {this.state.meeting.course}</h2>
            </div>

          <ListGroup>
              {
                this.state.race.competitors.map( (competitor,i) => (                
                    <ListGroupItem >
                        <Row>
                            <Col xs={3}>{competitor.name} </Col>
                            <Col xs={4}> {competitor.id}</Col>  
                        </Row>
                    </ListGroupItem>
                    ))
              }
          </ListGroup>
        </div>
    );
  }
}
export default Detail;