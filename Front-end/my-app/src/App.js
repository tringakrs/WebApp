import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import { Fluturimet } from './fluturimet/Fluturimet';
import SideBar from './Sidebar/SideBar';
import { Klienti } from './Klienti/Klienti';
import { Stafi } from './Stafi/Stafi';
import { PushimiPerPunetore } from './PushimiPerPunetore/PushimiPerPunetore';
import { KlientiBanka } from './KlientiBanka/KlientiBanka';
import { Kompania } from './kompania/Kompania';
import { Qyteti } from './Qyteti/Qyteti';
import {Roli} from "./Roli/Roli";
import { Pagesat } from './Pagesat/Pagesat';
import { Kafshet } from './Kafshet/Kafshet';
import {Aeroplani} from './Aeroplani/Aeroplani';
import {AplikoPerPune} from './AplikoPerPune/AplikoPerPune';
import {RentACar} from './RentACar/RentACar';
import {Shteti} from './Shteti/Shteti';
import {KompaniaCar} from './KompaniaCar/KompaniaCar';
import {Hotels} from './Hotels/Hotels';
import { Delivery } from './Delivery/Delivery';
import { Booking } from './Booking/Booking';
import { Aeroporti } from './Aeroporti/Aeroporti';



function App() {
  return (
   
   <BrowserRouter>
   <SideBar/>
   <Switch>
   <Route path="/RentACar" component={RentACar}/>
   <Route path="/fluturimet" component={Fluturimet}/>
   <Route path="/Aeroporti" component={Aeroporti}/>
   <Route path="/Hotels" component={Hotels}/>
   <Route path="/Klienti" component={Klienti}/>
   <Route path="/Roli" component={Roli}/>
   <Route path="/Stafi" component={Stafi}/>
   <Route path="/PushimiPerPunetore" component={PushimiPerPunetore}/>
   <Route path="/Booking" component={Booking}/>
   <Route path="/kafshet" component={Kafshet}/>
   <Route path="/KlientiBanka" component={KlientiBanka}/>
   <Route path="/kompania" component={Kompania}/>
   <Route path="/KompaniaCar" component={KompaniaCar}/>
   <Route path="/Qyteti" component={Qyteti}/>
   <Route path="/pagesat" component={Pagesat}/>
   <Route path="/Aeroplani" component={Aeroplani}/>
   <Route path="/AplikoPerPune" component={AplikoPerPune}/>
   <Route path="/Shteti" component={Shteti}/>
   <Route path="/Delivery" component={Delivery}/>



   <div className="Home1">
     <form className="container">

       <div className="label1">
         
         <div className="from">
           <label className="emratlabel">From:</label>
           <input id="emratinput"type='text'></input>
         </div>

         <div className="date">
         <input 
                id="dateinput"
                type="date"
                required
                />
         </div>
       </div>

       <div className="label1">
         <div className="from">
           <label className="emratlabel">To:</label>
           <input id="emratinput" type='text'></input>
         </div>
         
         <div className="date">
         <input 
                id="dateinput"
                type="date"
                required
                />
         </div>
       </div>
      
       <button className="buton" variant="primary" type="submit">
          Find flight
       </button>
       

     </form>
   </div>
   </Switch>
    </BrowserRouter>
    
  );
}

export default App;
