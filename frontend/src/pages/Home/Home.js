import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 

//import EventFilter from '../../components/EventFilter/EventFilter';
//import EventList from '../../components/EventList/EventList';

import SelectedSkills from '../../components/SelectedSkills/SelectedSkills';


function Home() {
    return (
        <div id="app">
            
            <Navbar />
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-md-6 p-3'>

                            {/* Skill Selector */}
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">Skill Selector</h4>
                                    <SelectedSkills />
                                </div>
                            </div>


                            
                        </div>  
                    </div>
                </div>
            </div>
            

            <Footer />
        </div>
    );
}

export default Home;