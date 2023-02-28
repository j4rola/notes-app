import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import {Tab, Tabs} from 'react-bootstrap/Tab';



function TabComponent({tab}) {

    const getData = () => {
      return null
    }
  return (
    <div>
        {tab.map( x => <div>
            {x.Title}
        </div>)}
        
    </div>
  );
}

export default TabComponent;