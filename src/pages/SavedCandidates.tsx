import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidateinterface';
import '../css/SavedCandidates.css';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('savedCandidates');
    if (savedData) {
      setSavedCandidates(JSON.parse(savedData));
    }
  }, []);

  const handleRejectCandidate = (login: string) => {
  // Corrected the filter condition to compare with the login passed to the function
  const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== login);
  
  // Update state and localStorage with the new list
  setSavedCandidates(updatedCandidates);
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};
  return (
    <div>
      <h1>Potential Candidates</h1>

      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Location</th>
            <th scope="col">Company</th>
            <th scope="col">Bio</th>
            <th scope="col">Reject</th>  
          </tr>
        </thead>

        <tbody>
          {savedCandidates.length > 0 ? (
            savedCandidates.map((candidate) => (
              <tr className ="row-container" key={candidate.login}> {/* Added key */}
                <td className = "img-container"><img src={candidate.avatarUrl} alt={candidate.name} className="avatar" /></td>
                <td>{candidate.name} ({candidate.login})</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td> {/* Fixed typo */}
                <td>{candidate.bio || 'N/A'}</td>
                <td className='btns-container'><button className="btn" onClick={() => handleRejectCandidate(candidate.login)}>-</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center">No saved candidates</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
