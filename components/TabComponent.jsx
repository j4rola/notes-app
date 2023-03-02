import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form'; 
import { useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../context';
const axios = require('axios');






function TabComponent({tab}) {
  const {myState, setMyState} = useContext(MyContext)
  console.log(` myContext: ${MyContext}`) 
  const [tabs, updateTabs] = useState(tab)
  const [notes, updateNotes] = useState([])
  const [loading, updateLoading] = useState(false)

  const [tabName, updateTabName] = useState('')
  const [noteBody, updateNoteBody] = useState('')
  const [currentTab, updateCurrentTab] = useState(null)

  const handleChange = (e) => {
    e.preventDefault()
    updateTabName(e.target.value)
  }

  const handleNoteChange = (e) => {
    e.preventDefault()
    
    updateNoteBody(e.target.value) 
    console.log(noteBody)
  }

  const handleSubmit = async (e) =>  {
    e.preventDefault()
    const response = await axios.post('/api/create-tab', {name: tabName})
    console.log(response.data)
    updateTabs([...tabs, response.data.notes])
    updateTabName('')
  } 

  const handleSubmitNote = async (e) =>  {
    e.preventDefault()
    const response = await axios.post('/api/create-note', {body: noteBody, tabId: parseInt(currentTab)})
    
    const data = await axios.post('/api/get-tabs', {id: parseInt(currentTab)}) 
    console.log(data.data.notes)
    updateNotes(data.data.notes)
    updateNoteBody('')
  } 

  const getData = async (e) => {
    updateCurrentTab(e.target.id)
    updateLoading(true)
    console.log(e.target.id)
    const data = await axios.post('/api/get-tabs', {id: parseInt(e.target.id)}) 
    console.log(data.data.notes)
    updateNotes(data.data.notes)
    updateLoading(false)
  }

  const handleDelete = async (id) => {
    // const newArray = myState.filter(x => x.id !== id)  
    // setMyState(newArray) 

    // console.log(myState) 

    console.log(`myState is ${myState}`)
    const newArray = tabs.filter(x => x.id !== id)  
    console.log( `newArray is ${newArray}`) 
    updateTabs(newArray) 
    
    const deleted = await axios.post('api/delete-tab', {id: parseInt(id)}) 

  }

  const handleDeleteNote = async (id) => {
    
    updateNotes(notes.filter(x => x.id !== id))
    const response = await axios.post('/api/delete-note', { id: parseInt(id)})
    updateNoteBody('')

  }

  console.log(tab)
  return (
    <><Tab.Container id="left-tabs-example" defaultActiveKey="first">   
      <Row className='d-flex flex-row'>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">  
          {tabs.map(x =>  
            <div>  
              <ButtonGroup className='w-50'>  
                <Button variant='light' style={{width: '150px'}} onClick={(e) => getData(e)} prop={[x.notes]} id={x.id}>{x.Title}</Button> 
                <Button variant='primary'>edit</Button> 
                <Button id={x.id} onClick={() => handleDelete(x.id)} variant='danger'>x</Button> 
              </ButtonGroup>   
            </div>)}  
            
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content className='p-4'> 
            
            {  notes.map(x => <p>{x.body} <span style={{color: 'red', cursor: 'pointer', fontWeight: 'bold'}} id={x.id} onClick={() => handleDeleteNote(x.id)}>x</span></p>) } 

            <Form.Control style={{width: '100px'}} onChange={(e) => handleNoteChange(e)} type="text"  placeholder="New Note" value={noteBody} />
            <Button onClick={(e) => handleSubmitNote(e)} variant='success' className='btn rounded'>Add Note</Button>

          </Tab.Content> 
        </Col> 
      </Row> 
    </Tab.Container>  

    <div>  
    <Form.Control style={{width: '100px'}} onChange={(e) => handleChange(e)} type="text"  placeholder="New Tab Name" value={tabName} /> 
    <Button onClick={(e) => handleSubmit(e)} variant='success' className='btn rounded'>Add Tab</Button>  
    
    </div></>  
  );
}


export default TabComponent;   