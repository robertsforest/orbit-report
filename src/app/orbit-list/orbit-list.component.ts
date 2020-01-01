import { Component, OnInit, Input } from '@angular/core';
import { Satellite } from '../satellite';



@Component({
  selector: 'app-orbit-list',
  templateUrl: './orbit-list.component.html',
  styleUrls: ['./orbit-list.component.css']
})
export class OrbitListComponent implements OnInit {
  @Input() satellites: Satellite[];

  sortedAscending;
  
  constructor() { 
    this.sortedAscending = false;
  }

  ngOnInit() {
  }



  sort(column: string): void {
    // array.sort modifies the array, sorting the items based on the given compare function
    // allows the user to toggle ascending or descending sort
    // TODO: default to ascending when a user clicks on a different column
    let _this = this;
    this.satellites.sort(function(a: Satellite, b: Satellite): number {
         
        if(a[column] > b[column]) {
           return (_this.sortedAscending ? -1 : 1);
        } else if (a[column] < b[column]) {
           return (_this.sortedAscending ? 1 : -1);
        }
        return 0;
     });
     this.sortedAscending = !this.sortedAscending;
 }

}
