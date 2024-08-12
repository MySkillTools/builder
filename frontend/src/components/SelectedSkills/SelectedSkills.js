import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { produce } from 'immer';
import './SelectedSkills.scss';

const SelectedSkills = ({ skillsMatrix, setSkillsMatrix }) => {
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
        <div className="selected-skills-container bg-white full-width">
            <div className="skills-matrix-wrapper full-width">
                <div className='d-flex full-width'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="align-content-center">
                            <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                                <button className="btn btn-outline-primary" onClick={addRow}>
                                    <i className="fas fa-plus"></i>
                                </button>
                                <button className="btn btn-outline-danger" onClick={removeRow}>
                                    <i className="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div className='p-3 full-width'>
                            <div className="d-flex justify-content-center">
                                <div className="btn-group" role="group">
                                    <button className="btn btn-outline-primary" onClick={addCol}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={removeCol}>
                                        <i className="fas fa-minus"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="skills-container p-3 full-width">
                                {skillsMatrix.map((row, rowIndex) => (
                                    <div className="row" key={`row-${rowIndex}`}>
                                        {row.map((cell, cellIndex) => (
                                            <Droppable droppableId={`${rowIndex}-${cellIndex}`} key={`cell-${rowIndex}-${cellIndex}`}>
                                                {(provided) => (
                                                    <div ref={provided.innerRef} {...provided.droppableProps} className="cell">
                                                        <small className='text-muted fw-bold'>Row {rowIndex+1}, Col {cellIndex+1}</small>
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
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default SelectedSkills;
