import React from 'react';
import { SuperHeader, Navbar } from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 

//import EventFilter from '../../components/EventFilter/EventFilter';
//import EventList from '../../components/EventList/EventList';

import SelectedSkills from '../../components/SelectedSkills/SelectedSkills';


function Home() {
    return (
        <div id="app">
            
            <SuperHeader />
            <Navbar />
            
           
            
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-md-6'>
                            <SelectedSkills cols={5} />
                        </div>  
                    </div>
                </div>
            </div>

            
            

            <Footer />
        </div>
    );
}


export default Home;