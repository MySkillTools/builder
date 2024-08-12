import React from 'react';

const SkillMatrixDisplay = ({ skillsMatrix }) => {
    return (
        <div className="skill-matrix-display">
            {skillsMatrix.map((row, rowIndex) => (
                <div key={`display-row-${rowIndex}`} className="row">
                    {row.map((cell, cellIndex) => (
                        <div key={`display-cell-${rowIndex}-${cellIndex}`} className="col">
                            {cell.map(skill => (
                                <span key={skill.id} className="badge bg-secondary m-1">{skill.name}</span>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SkillMatrixDisplay;
