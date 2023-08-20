export function useUsername() {
  const username = localStorage.getItem('Username');
  return username;
}

