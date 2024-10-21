import React, { createContext, useContext, useState } from 'react';

interface Mission {
  id: number;
  name: string;
  status: 'to-do' | 'in-progress' | 'completed';
  assignedTo: string;
  dueDate?: string;
  startDate?: string;
  completionDate?: string;
}

interface MissionContextType {
  missions: Mission[];
  addMission: (mission: Mission) => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const MissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [missions, setMissions] = useState<Mission[]>([]);

  const addMission = (mission: Mission) => {
    setMissions((prev) => [...prev, mission]);
  };

  return (
    <MissionContext.Provider value={{ missions, addMission }}>
      {children}
    </MissionContext.Provider>
  );
};

export const useMissions = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};
