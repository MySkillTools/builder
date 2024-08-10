import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './SelectedSkills.scss';

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

const SelectedSkills = () => {
    const [skillsMatrix, setSkillsMatrix] = useState(initialSkills);

    const reorderSkills = (source, destination) => {
        const sourceIndices = source.droppableId.split('-').map(Number);
        const destIndices = destination.droppableId.split('-').map(Number);
        const newSkillsMatrix = skillsMatrix.map(row => row.map(cell => [...cell]));
        const sourceCell = newSkillsMatrix[sourceIndices[0]][sourceIndices[1]];
        const destCell = newSkillsMatrix[destIndices[0]][destIndices[1]];
        const [removed] = sourceCell.splice(source.index, 1);

        if (source.droppableId !== destination.droppableId) {
            destCell.splice(destination.index, 0, removed);
        } else {
            sourceCell.splice(destination.index, 0, removed);
        }

        return newSkillsMatrix;
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        if (
            result.source.droppableId !== result.destination.droppableId ||
            result.source.index !== result.destination.index
        ) {
            const newSkillsMatrix = reorderSkills(result.source, result.destination);
            setSkillsMatrix(newSkillsMatrix);
        }
    };

    // Function to add a new row
    const addRow = () => {
        const lastRow = skillsMatrix[skillsMatrix.length - 1];
        const newRow = lastRow.map(() => []); // Create a new row with the same number of columns
        setSkillsMatrix([...skillsMatrix, newRow]);
    };

    // Function to remove the last row
    const removeRow = () => {
        if (skillsMatrix.length > 1) {
            setSkillsMatrix(skillsMatrix.slice(0, -1));
        }
    };

    // Function to add a new column to each row
    const addCol = () => {
        const newSkillsMatrix = skillsMatrix.map(row => [...row, []]);
        setSkillsMatrix(newSkillsMatrix);
    };

    // Function to remove the last column from each row
    const removeCol = () => {
        if (skillsMatrix[0].length > 1) {
            const newSkillsMatrix = skillsMatrix.map(row => row.slice(0, -1));
            setSkillsMatrix(newSkillsMatrix);
        }
    };

    return (
        <>
            <div className="controls">
                <button onClick={addRow}>Add Row</button>
                <button onClick={removeRow}>Remove Last Row</button>
                <button onClick={addCol}>Add Column</button>
                <button onClick={removeCol}>Remove Last Column</button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="selected-skills skills-container">
                    {skillsMatrix.map((row, rowIndex) => (
                        <div className="row" key={`row-${rowIndex}`}>
                            {row.map((cell, cellIndex) => (
                                <Droppable droppableId={`${rowIndex}-${cellIndex}`} key={`cell-${rowIndex}-${cellIndex}`} direction="vertical">
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
                                                            style={provided.draggableProps.style}
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
