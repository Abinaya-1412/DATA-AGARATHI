import { ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'

export function handleDownloadExcel(data: any, fileName: string) {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new(); // book yaradir 

    XLSX.utils.book_append_sheet(workBook, workSheet, 'datas')

    let buffer = XLSX.write(workBook, { bookType: "xlsx", type: 'buffer' });
    XLSX.write(workBook, { bookType: "xlsx", type: 'binary' }); //binary string

    XLSX.writeFile(workBook, fileName + '.xlsx'); // download

}

export function exportToExcel(data: any[], headerKeyArray: string[], headerTranslateArray: string[], filename: string) {
    const filteredData = data.map(item => {
      const filteredItem: any = {};
      const obj: { [key: string]: string } = {};
    
      headerKeyArray.map((dt: any, key: any) => {
        obj[`${dt}`] = headerTranslateArray[key];
      })

      Object.keys(obj).forEach(columnKey => {
        if (item.hasOwnProperty(columnKey)) {
          const mappedColumnName = obj[columnKey];
          if (mappedColumnName) {
            filteredItem[mappedColumnName] = item[columnKey];
          }
        }
      });
      return filteredItem;
    });
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    FileSaver.saveAs(blob, filename + '.xlsx');
  }