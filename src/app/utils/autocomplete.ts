export function filterAutocomplete(value: string, arrayofElements: any[]): any[] {
  const filterValue = value.toLowerCase(); 
  return arrayofElements.filter((state) =>
    state.value?.toLowerCase().startsWith(filterValue) 
  );
} 