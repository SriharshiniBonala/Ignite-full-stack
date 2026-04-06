import React, { createContext, useContext, useState } from "react";

const MentorContext = createContext();

export const useMentor = () => {
  return useContext(MentorContext);
};

export const MentorProvider = ({ children }) => {
  const [mentorData, setMentorData] = useState(null);

  const updateMentorData = (data) => {
    setMentorData(data);
  };

  return (
    <MentorContext.Provider value={{ mentorData, updateMentorData }}>
      {children}
    </MentorContext.Provider>
  );
};