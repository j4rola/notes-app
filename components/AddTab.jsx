import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';

import axios from 'axios';
import { useState } from 'react';

function AddTab({originalTabs}) {

    const [tabName, updateTabName] = useState('')
    const [tabs, setTabs] = useState(originalTabs)

    const handleChange = (e) => {
        e.preventDefault()
        updateTabName(e.target.value)
    }

    const handleSubmit = async (e) =>  {
        e.preventDefault()
        const response = await axios.post('/api/create-tab', {name: tabName})
        //setTabs([...tabs, response.data])
        updateTabName('')
    }

    return (
        <div>  
            <Form.Control onChange={(e) => handleChange(e)} type="text"  placeholder="New Tab Name" value={tabName} />
            <Button onClick={(e) => handleSubmit(e)} variant='success' className='btn rounded'>Add</Button>
            
        </div>  
    )
}

export default AddTab  
