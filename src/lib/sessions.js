export const getSession = () => {
  const session = localStorage.getItem('session');

  if (!session) return null;

  const parsedSession = session && JSON.parse(session);

  return parsedSession;
}

export const setSession = data => {
  const jsonData = JSON.stringify(data);

  localStorage.setItem('session', jsonData);
}
