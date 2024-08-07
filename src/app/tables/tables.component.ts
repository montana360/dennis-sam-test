import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  data: any[] = [];
  searchTerm: string = '';
  sortedColumn: string = '';
  ascending: boolean = true;
  p: number = 1;
  itemsPerPage: number = 5;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.data = data;
    });
  }

  sort(column: string): void {
    if (this.sortedColumn === column) {
      this.ascending = !this.ascending;
    } else {
      this.sortedColumn = column;
      this.ascending = true;
    }

    this.data.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.ascending ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.ascending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  filteredData(): any[] {
    return this.data.filter(item => 
      item.id.toString().includes(this.searchTerm) ||
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item.company.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getSortIcon(column: string): string {
    if (this.sortedColumn === column) {
      return this.ascending ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
    }
    return '';
  }
}
