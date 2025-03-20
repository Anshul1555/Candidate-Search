import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidateinterface';
import '../css/CandidateSearch.css';


const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [candidateIndex, setCandidateIndex] = useState<number>(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const data = await searchGithub();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    if (candidates.length > 0 && candidateIndex < candidates.length) {
      const candidate = candidates[candidateIndex];
      const fetchUserData = async () => {
        const detailedData = await searchGithubUser(candidate.login);
        console.log(detailedData);
        setCurrentCandidate({
          login: detailedData.login,
          name: detailedData.name,
          avatarUrl: detailedData.avatar_url,
          location: detailedData.location,
          email: detailedData.email,
          company: detailedData.company,
          bio: detailedData.bio,
        });
      };
      fetchUserData();
    }
  }, [candidateIndex, candidates]);

  const handleSaveCandidate = () => {
    if (currentCandidate) {
      const updatedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
    }
    setCandidateIndex(candidateIndex + 1);
  };

  const handleSkipCandidate = () => {
    setCandidateIndex(candidateIndex + 1);
  };

  return (
    <div className="main">
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div className="card">
          <div>
            <img src={currentCandidate.avatarUrl} alt={currentCandidate.name} className="avatar" />
            <h2>{currentCandidate.name}({currentCandidate.login}) </h2>
            <p>Location: {currentCandidate.location || 'N/A'}</p>
            <p>Email: {currentCandidate.email || 'N/A'}</p>
            <p>Company: {currentCandidate.company || 'N/A'}</p>
            <p id ="bio">Bio: {currentCandidate.bio || 'N/A'}</p>
          </div>
          
        </div>
      ) : (
        <p>Loading candidate information...</p>
      )}
      <div className="buttons">
            <button onClick={handleSkipCandidate} className="removeButton">-</button>
            <button onClick={handleSaveCandidate} className="addButton">+</button>
      </div>
    </div>
  );
}

export default CandidateSearch;
