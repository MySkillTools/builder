import React from 'react';
import { Navbar } from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 

//import EventFilter from '../../components/EventFilter/EventFilter';
//import EventList from '../../components/EventList/EventList';

function Home() {
    return (
        <div id="app">
            
            <Navbar />
            { /*
            <SuperHeader />
            
            
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <EventFilter />
                        <EventList />
                    </div>
                </div>
            </div>

            
            */ }

            <Footer />
        </div>
    );
}


export default Home;