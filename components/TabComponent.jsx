import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const axios = require('axios');






function TabComponent({tab}) {

  const [notes, updateNotes] = useState([])
  const [loading, updateLoading] = useState(false)

  const getData = async (e) => {
    updateLoading(true)
    console.log(e.target.id)
    const data = await axios.post('/api/get-tabs', {id: parseInt(e.target.id)}) 
    console.log(data.data.notes)
    updateNotes(data.data.notes)
    updateLoading(false)
  }

  console.log(tab)
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row className='d-flex flex-row'>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
          {tab.map(x => 
            <div>
              <Button variant='light'  onClick={(e) => getData(e)} prop={[x.notes]} id={x.id}>{x.Title}</Button> 
              
            </div>)}  
            
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            
            {  notes.map(x => <p>{x.body}</p>) }

          </Tab.Content> 
        </Col> 
      </Row> 
    </Tab.Container>
  );
}


export default TabComponent;