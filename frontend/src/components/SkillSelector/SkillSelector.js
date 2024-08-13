import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SkillSelector.scss';

function SkillSelector() {
    const [skills, setSkills] = useState([
        { id: 'skill1', name: 'HTML' },
        { id: 'skill2', name: 'CSS' },
        { id: 'skill3', name: 'JavaScript' },
        { id: 'skill4', name: 'React' },
        { id: 'skill5', name: 'Node.js' },
        { id: 'skill6', name: 'Express.js' },
        { id: 'skill7', name: 'MongoDB' },
        { id: 'skill8', name: 'SQL' },
        { id: 'skill9', name: 'Python' },
        { id: 'skill10', name: 'Django' },
        { id: 'skill11', name: 'Flask' },
        { id: 'skill12', name: 'Java' },
        { id: 'skill13', name: 'Spring Boot' },
        { id: 'skill14', name: 'C#' },
        { id: 'skill15', name: '.NET' },
        { id: 'skill16', name: 'Angular' },
        { id: 'skill17', name: 'Vue.js' },
        { id: 'skill18', name: 'TypeScript' },
        { id: 'skill19', name: 'GraphQL' },
        { id: 'skill20', name: 'REST API' },
        { id: 'skill21', name: 'Docker' },
        { id: 'skill22', name: 'Kubernetes' },
        { id: 'skill23', name: 'AWS' },
        { id: 'skill24', name: 'Azure' },
        { id: 'skill25', name: 'Google Cloud' },
        { id: 'skill26', name: 'Machine Learning' },
        { id: 'skill27', name: 'TensorFlow' },
        { id: 'skill28', name: 'PyTorch' },
        { id: 'skill29', name: 'OpenCV' },
        { id: 'skill30', name: 'Data Science' },
        { id: 'skill31', name: 'Big Data' },
        { id: 'skill32', name: 'Hadoop' },
        { id: 'skill33', name: 'Spark' },
        { id: 'skill34', name: 'Scala' },
        { id: 'skill35', name: 'Go' },
        { id: 'skill36', name: 'Rust' },
        { id: 'skill37', name: 'Swift' },
        { id: 'skill38', name: 'Kotlin' },
        { id: 'skill39', name: 'Objective-C' },
        { id: 'skill40', name: 'iOS Development' },
        { id: 'skill41', name: 'Android Development' },
        { id: 'skill42', name: 'React Native' },
        { id: 'skill43', name: 'Flutter' },
        { id: 'skill44', name: 'UI/UX Design' },
        { id: 'skill45', name: 'Figma' },
        { id: 'skill46', name: 'Sketch' },
        { id: 'skill47', name: 'Adobe XD' },
        { id: 'skill48', name: 'Photoshop' },
        { id: 'skill49', name: 'Illustrator' },
        { id: 'skill50', name: 'SEO' },
    ]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [groups, setGroups] = useState([]);
    const [activeGroupIndex, setActiveGroupIndex] = useState(null);  // null means no group is selected

    // Handles adding skills to either a group or the main selectedSkills list
    const handleAddSkill = (skill) => {
        if (activeGroupIndex !== null) {
            const newGroups = [...groups];
            newGroups[activeGroupIndex].items.push(skill);
            setGroups(newGroups);
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    // Add a new group
    const addGroup = () => {
        const newGroup = { id: `group-${groups.length}`, name: `Group ${groups.length + 1}`, items: [] };
        setGroups([...groups, newGroup]);
        setActiveGroupIndex(groups.length);  // Set the newly created group as active
    };

    // Function to select an active group
    const selectGroup = (index) => {
        setActiveGroupIndex(index);
    };

    return (
        <div className="skills-container container-fluid">
            <div className="row">
                <div className="col-md-6 skill-pool py-2">
                    <h4 className="card-title fw-bold mb-3">My Skill Bank</h4>
                    <div className="cell">
                        {skills.map((skill) => (
                            <button key={skill.id} onClick={() => handleAddSkill(skill)} className="skill">
                                {skill.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-md-6 skill-destination py-2">
                    <h4 className="card-title fw-bold mb-3">Selected Skills</h4>
                    <button onClick={addGroup}>Add Group</button>
                    {groups.map((group, index) => (
                        <div key={group.id}>
                            <h5 onClick={() => selectGroup(index)}>{group.name}</h5>
                            <div className="cell">
                                {group.items.map((skill) => (
                                    <div key={skill.id} className="skill">{skill.name}</div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="cell">
                        {selectedSkills.map((skill) => (
                            <div key={skill.id} className="skill">{skill.name}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SkillSelector;