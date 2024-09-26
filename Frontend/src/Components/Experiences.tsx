import React, { useState, useEffect } from 'react';
import Experience from './Experience';

type ExperienceData = {
  title: string;
  description: string;
};

const initialExperiences: ExperienceData[] = [
  { title: 'Experience 1', description: 'Description of Experience 1' },
  { title: 'Experience 2', description: 'Description of Experience 2' },
  { title: 'Experience 3', description: 'Description of Experience 3' }
];

export default function Experiences() {
  const [experiences, setExperiences] = useState<ExperienceData[]>(() => {
    const savedExperiences = localStorage.getItem('experiences');
    return savedExperiences && JSON.parse(savedExperiences).length > 0 
      ? JSON.parse(savedExperiences)
      : initialExperiences;
  });

  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);

  const removeExperience = (indexToRemove: number) => {
    const updatedExperiences = experiences.filter((_, index) => index !== indexToRemove);
    setExperiences(updatedExperiences);

    if (updatedExperiences.length === 0) {
      localStorage.removeItem('experiences');
    }
  };

  return (
    <>
      {experiences.length === 0 ? (
        <p>Ingen erfaringer</p>
      ) : (
        experiences.map((experience, index) => (
          <div key={index}>
            <Experience
              title={experience.title}
              description={experience.description}
            />
            <button onClick={() => removeExperience(index)}>Remove experience</button>
          </div>
        ))
      )}
    </>
  );
}
