export function filterAutocomplete(value: string, arrayofElements: any[]): any[] {
  const filterValue = value.toLowerCase();
  return arrayofElements.filter((state) =>
    state.value?.toLowerCase().startsWith(filterValue)
  );
}

// export function getFilterValues() {
//   this.filters = [];
//   let filterArr: any[] = [];
//   Object.keys(filterForm.controls).forEach((key: string) => {
//     if (String(filterForm.get(key)?.value).length > 0) {
//       filterArr?.push({
//         columnName: key,
//         value: filterForm.get(key)?.value,
//       });
//     }
//   });

//   filterArr.map((dt: any) => {
//     data.every((filter) => {
//       if (filter.hasOwnProperty(dt.columnName)) {
//         this.filters.push(dt);
//       }
//     });
//   })

//   return this.filters
// }