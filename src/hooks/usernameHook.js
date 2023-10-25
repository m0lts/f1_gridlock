export function useUsername() {
  const forename = sessionStorage.getItem('Forename');
  const surname = sessionStorage.getItem('Surname');
  return {forename, surname};
}

