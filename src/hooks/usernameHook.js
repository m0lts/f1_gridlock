export function useUsername() {
  const username = sessionStorage.getItem('Username');
  return {username};
}

