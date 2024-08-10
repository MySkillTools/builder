import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './SelectedSkills.scss';

const flattenSkills = [
    { id: 'skill-1', name: 'JavaScript' }, { id: 'skill-2', name: 'React' },
    { id: 'skill-3', name: 'Node.js' }, { id: 'skill-4', name: 'Python' },
    { id: 'skill-5', name: 'Django' }, { id: 'skill-6', name: 'Flask' },
    { id: 'skill-7', name: 'Ruby' }, { id: 'skill-8', name: 'Rails' },
    { id: 'skill-9', name: 'Java' }, { id: 'skill-10', name: 'Spring Boot' },
    { id: 'skill-11', name: 'Angular' }
];

const SelectedSkills = () => {
    const [matrixSize, setMatrixSize] = useState(3);
    const [skillsMatrix, setSkillsMatrix] = useState([]);

    useEffect(() => {
        const newSkillsMatrix = [];
        for (let i = 0; i < matrixSize; i++) {
            newSkillsMatrix.push([]);
            for (let j = 0; j < matrixSize; j++) {
                const skillIndex = (i * matrixSize + j) % flattenSkills.length;
                newSkillsMatrix[i].push([flattenSkills[skillIndex]]);
            }
        }
        setSkillsMatrix(newSkillsMatrix);
    }, [matrixSize]);

    const reorderSkills = (source, destination) => {
        const sourceIndices = source.droppableId.split('-').map(Number);
        const destIndices = destination.droppableId.split('-').map(Number);
        const newSkillsMatrix = skillsMatrix.map(row => row.map(cell => [...cell]));
        const sourceCell = newSkillsMatrix[sourceIndices[0]][sourceIndices[1]];
        const destCell = newSkillsMatrix[destIndices[0]][destIndices[1]];
        const [removed] = sourceCell.splice(source.index, 1);

        destCell.splice(destination.index, 0, removed);
        return newSkillsMatrix;
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index) return;
        
        const newSkillsMatrix = reorderSkills(source, destination);
        setSkillsMatrix(newSkillsMatrix);
    };

    return (
        <>
            <input
                type="number"
                value={matrixSize}
                onChange={(e) => setMatrixSize(Math.max(1, Number(e.target.value)))}
                min="1"
                className="matrix-size-input"
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="selected-skills skills-container">
                    {skillsMatrix.map((row, rowIndex) => (
                        <div className="row" key={`row-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                                <Droppable droppableId={`${rowIndex}-${cellIndex}`} key={`cell-${rowIndex}-${cellIndex}`}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className="cell"
                                        >
                                            {cell.map((skill, index) => (
                                                <Draggable key={skill.id} draggableId={skill.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="skill"
                                                        >
                                                            {skill.name}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </>
    );
};

export default SelectedSkills;
