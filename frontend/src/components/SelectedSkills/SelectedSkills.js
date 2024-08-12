import React from 'react';

const SelectedSkills = ({ skillsMatrix }) => {
    return (
        <table className="table table-bordered skill-matrix-display">
            <tbody>
                {skillsMatrix.map((row, rowIndex) => (
                    <tr key={`display-row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                            <td key={`display-cell-${rowIndex}-${cellIndex}`}>
                                {cell.map((skill, index) => (
                                    <span key={skill.id}>
                                        {skill.name}{index < cell.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SelectedSkills;
