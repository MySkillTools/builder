import React, { useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 

import SkillSelector from '../../components/SkillSelector/SkillSelector';

function Home() {
    return (
        <div id="app">
            <Navbar />
            <div className="content">
                <div className="container-fluid">

                    <div className='my-2'>
                        <SkillSelector />
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
