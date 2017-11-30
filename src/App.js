import './App.css';

import React, { Component } from 'react';
import Detail from './components/Detail'
import List from './components/List'
import { Route,Switch } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
         <Row>
           <Col>
            <div>
              <h2>Next 5 match</h2>
            </div>
           </Col>
           </Row>
        <Row>
              <Col>
                <Switch>
                  <Route exact path='/' component={List} />
                  <Route path='/detail' component={Detail}/>
                </Switch>
              </Col>
              </Row>
      </Container>
    );
  }
}

export default App;
