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

    const onDragEnd = (result) => {
        const { source, destination } = result;
    
        if (!destination) {
            return;
        }
    
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
    
        const sourceList = source.droppableId === 'skills' ? skills : selectedSkills;
        const destinationList = destination.droppableId === 'skills' ? skills : selectedSkills;
    
        if (source.droppableId === destination.droppableId) {
            const items = reorder(sourceList, source.index, destination.index);
            if (source.droppableId === 'skills') {
                setSkills(items);
            } else {
                setSelectedSkills(items);
            }
        } else {
            const result = move(sourceList, destinationList, source.index, destination.index);
            if (source.droppableId === 'skills') {
                setSkills(result.source);
                setSelectedSkills(result.destination);
            } else {
                setSkills(result.destination);
                setSelectedSkills(result.source);
            }
        }
    };
    
    function reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    
    function move(source, destination, droppableSourceIndex, droppableDestinationIndex) {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        const [removed] = sourceClone.splice(droppableSourceIndex, 1);
        destClone.splice(droppableDestinationIndex, 0, removed);
    
        return {
            source: sourceClone,
            destination: destClone,
        };
    }
    
    return (
        <div className="skills-container container-fluid">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">
                    <Droppable droppableId="skills">
                        {(provided) => (
                            <div className="col-md-6 skill-pool py-2" ref={provided.innerRef} {...provided.droppableProps}>
                                <h4 className="card-title fw-bold mb-3">My Skill Bank</h4>
                                <div className="cell">
                                    {skills.map((skill, index) => (
                                        <Draggable key={skill.id} draggableId={skill.id} index={index}>
                                            {(provided) => (
                                                <div className="skill"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    {skill.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="selectedSkills">
                        {(provided) => (
                            <div className="col-md-6 skill-desination py-2" ref={provided.innerRef} {...provided.droppableProps}>
                                <h4 className="card-title fw-bold mb-3">Selected Skills</h4>
                                <div className="cell">
                                    {selectedSkills.map((skill, index) => (
                                        <Draggable key={skill.id} draggableId={skill.id} index={index}>
                                            {(provided) => (
                                                <div className="skill"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    {skill.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

export default SkillSelector;
