import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './SkillSelector.scss';

function SkillSelector() {
    const [skills, setSkills] = useState([
        { id: 'skill1', name: 'HTML' },
        { id: 'skill2', name: 'CSS' },
        { id: 'skill3', name: 'JavaScript' }
    ]);
    const [selectedSkills, setSelectedSkills] = useState([]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
    
        // If dropped outside the list or if there is no destination, do nothing
        if (!destination) {
            return;
        }
    
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }
    
        const sourceList = source.droppableId === 'skills' ? skills : selectedSkills;
        const destinationList = destination.droppableId === 'skills' ? skills : selectedSkills;
    
        if (source.droppableId === destination.droppableId) {
            // Handling reordering within the same list
            const items = reorder(sourceList, source.index, destination.index);
            if (source.droppableId === 'skills') {
                setSkills(items);
            } else {
                setSelectedSkills(items);
            }
        } else {
            // Handling moving between lists
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
    
    // Helper function to reorder an item within an array
    function reorder(list, startIndex, endIndex) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }
    
    // Helper function to move an item between lists
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
        <div className="skills-container container">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="row">
                    <Droppable droppableId="skills">
                        {(provided) => (
                            <div className="col-md-6" ref={provided.innerRef} {...provided.droppableProps}>
                                {skills.map((skill, index) => (
                                    <Draggable key={skill.id} draggableId={skill.id} index={index}>
                                        {(provided) => (
                                            <div className="cell"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <div className="skill">{skill.name}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="selectedSkills">
                        {(provided) => (
                            <div className="col-md-6" ref={provided.innerRef} {...provided.droppableProps}>
                                {selectedSkills.map((skill, index) => (
                                    <Draggable key={skill.id} draggableId={skill.id} index={index}>
                                        {(provided) => (
                                            <div className="cell"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <div className="skill">{skill.name}</div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
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
