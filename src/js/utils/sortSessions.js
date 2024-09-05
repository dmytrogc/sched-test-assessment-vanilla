const sortSessions = (sessions) => {
  const sorted = [...sessions].sort((a, b) => {
    const dateA = new Date(a.session_start);
    const dateB = new Date(b.session_start);

    return dateA - dateB;
  });

  return sorted;
};

export default sortSessions;
