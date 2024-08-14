import React from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 

import BuildSkillBank from '../../components/BuildSkillBank/BuildSkillBank';
import SkillSelector from '../../components/SkillSelector/SkillSelector';

function Home() {
    return (
        <div id="app">
            <Navbar />
            <div className="content">
                <div className="container-fluid">

                    <div className='my-3'>
                        <BuildSkillBank />
                        <SkillSelector />
                    </div>

                    <div>
                        HELLO
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
