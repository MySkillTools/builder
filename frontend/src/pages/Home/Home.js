import React, { useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer'; 
import SelectedSkills from '../../components/SelectedSkills/SelectedSkills';

function Home() {
    // Initial skill matrix lifted to the parent component
    const initialSkills = [
        [
            [{ id: 'skill-1', name: 'JavaScript' }, { id: 'skill-2', name: 'React' }],
            [{ id: 'skill-3', name: 'Node.js' }],
            [{ id: 'skill-4', name: 'Python' }],
        ],
        [
            [{ id: 'skill-5', name: 'Django' }],
            [{ id: 'skill-6', name: 'Flask' }, { id: 'skill-7', name: 'Ruby' }],
            [{ id: 'skill-8', name: 'Rails' }],
        ],
        [
            [{ id: 'skill-9', name: 'Java' }],
            [{ id: 'skill-10', name: 'Spring Boot' }],
            [{ id: 'skill-11', name: 'Angular' }],
        ]
    ];

    const [skillsMatrix, setSkillsMatrix] = useState(initialSkills);

    const renderSkillMatrix = () => {
        return skillsMatrix.map((row, rowIndex) => (
            <div key={`display-row-${rowIndex}`} className="row">
                {row.map((cell, cellIndex) => (
                    <div key={`display-cell-${rowIndex}-${cellIndex}`} className="col">
                        {cell.map(skill => (
                            <span key={skill.id} className="badge bg-secondary m-1">{skill.name}</span>
                        ))}
                    </div>
                ))}
            </div>
        ));
    };

    return (
        <div id="app">
            <Navbar />
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-md-6 p-3'>

                            <div className="card mb-3">
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">Skill Selector</h4>
                                    <SelectedSkills skillsMatrix={skillsMatrix} setSkillsMatrix={setSkillsMatrix} />
                                </div>
                            </div>

                            {/* New Card for displaying the skill matrix */}
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title fw-bold">Skill Matrix Display</h4>
                                    <div className="skill-matrix-display">
                                        {renderSkillMatrix()}
                                    </div>
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
