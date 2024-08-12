import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { produce } from 'immer';
import './SkillSelector.scss';

/**
 * Component for selecting skills via drag and drop.
 * @param {Array<Array<Array<Object>>>} skillsMatrix - The matrix of skills.
 * @param {Function} setSkillsMatrix - State setter function for the skills matrix.
 */

const SkillSelector = ({ skillsMatrix, setSkillsMatrix }) => {

    // Function to reorder skills within the matrix when an item is dragged and dropped.
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

    // Handles the end of a drag operation, applying the reorder function.
    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        reorderSkills(result.source, result.destination);
    };

    // Adds a new row to the skills matrix.
    const addRow = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            const newRow = new Array(draftMatrix[0].length).fill([]).map(() => []);
            draftMatrix.push(newRow);
        }));
    };

    // Removes the last row from the skills matrix.
    const removeRow = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            if (draftMatrix.length > 1) {
                const itemsToMove = draftMatrix.pop().flat();
                draftMatrix[0][0].push(...itemsToMove);
            }
        }));
    };

    // Adds a new column to each row in the skills matrix.
    const addCol = () => {
        setSkillsMatrix(currentMatrix => produce(currentMatrix, draftMatrix => {
            draftMatrix.forEach(row => row.push([]));
        }));
    };

    // Removes the last column from each row of the skills matrix.
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

                {/* Wrapper for layout management */}
                <div className='d-flex full-width'>

                    {/* Drag and drop context to manage draggable elements */}
                    <DragDropContext onDragEnd={onDragEnd}>

                        {/* Column management buttons */}
                        <div className="align-content-center">
                            <div className="btn-group-vertical" role="group" aria-label="Vertical button group">

                                {/* Add row icon */}
                                <button className="btn btn-outline-primary" onClick={addRow}>
                                    <i className="fas fa-plus"></i>
                                </button>

                                {/* Remove row icon */}
                                <button className="btn btn-outline-danger" onClick={removeRow}>
                                    <i className="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        
                        {/* Row management buttons */}
                        <div className='full-width'>
                            <div className="d-flex justify-content-center">
                                <div className="btn-group" role="group">

                                    {/* Add column icon */}
                                    <button className="btn btn-outline-primary" onClick={addCol}>
                                        <i className="fas fa-plus"></i>
                                    </button>

                                    {/* Remove column icon */}
                                    <button className="btn btn-outline-danger" onClick={removeCol}>
                                        <i className="fas fa-minus"></i> 
                                    </button>
                                </div>
                            </div>

                            {/* Skills display area */}
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
                            {/* */}

                        </div>
                        {/* */}

                    </DragDropContext>
                    {/* */}
                    
                </div>
                {/* */}

            </div>
        </div>
    );
};

export default SkillSelector;
