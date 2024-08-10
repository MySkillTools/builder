import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { produce } from 'immer';
import './SelectedSkills.scss';

// Initial matrix of skills, structured as an array of rows, where each row is an array of cells containing skills.
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
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            const sourceIndices = source.droppableId.split('-').map(Number);
            const destIndices = destination.droppableId.split('-').map(Number);
            const sourceCell = draftMatrix[sourceIndices[0]][sourceIndices[1]];
            const destCell = draftMatrix[destIndices[0]][destIndices[1]];
            const [removed] = sourceCell.splice(source.index, 1);

            if (source.droppableId !== destination.droppableId) {
                destCell.splice(destination.index, 0, removed);
            } else {
                sourceCell.splice(destination.index, 0, removed);
            }
        }));
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        reorderSkills(result.source, result.destination);
    };

    const moveToFirstCell = (items) => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            draftMatrix[0][0].push(...items);
        }));
    };

    const addRow = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            const newRow = new Array(draftMatrix[0].length).fill([]).map(() => []);
            draftMatrix.push(newRow);
        }));
    };

    const removeRow = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            if (draftMatrix.length > 1) {
                const itemsToMove = draftMatrix.pop().flat();
                draftMatrix[0][0].push(...itemsToMove);
            }
        }));
    };

    const addCol = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            draftMatrix.forEach(row => row.push([]));
        }));
    };

    const removeCol = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            if (draftMatrix[0].length > 1) {
                const itemsToMove = draftMatrix.map(row => row.pop()).flat();
                draftMatrix[0][0].push(...itemsToMove);
            }
        }));
    };

    return (
        <div className="selected-skills-container">
            <div className="col-controls">
                <button className="btn btn-outline-primary" onClick={addCol}>
                    <i className="fas fa-plus"></i> Add Column
                </button>
                <button className="btn btn-outline-danger" onClick={removeCol}>
                    <i className="fas fa-minus"></i> Remove Column
                </button>
            </div>
            <div className="skills-matrix-wrapper">
                <div className="row-controls">
                    <button className="btn btn-outline-primary" onClick={addRow}>
                        <i className="fas fa-plus"></i> Add Row
                    </button>
                    <button className="btn btn-outline-danger" onClick={removeRow}>
                        <i className="fas fa-minus"></i> Remove Row
                    </button>
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
            </div>
        </div>
    );
};

export default SelectedSkills;
