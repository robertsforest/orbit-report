import { Component } from '@angular/core';
import { Satellite } from './satellite';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  objectCounts;


  constructor() {
    this.sourceList = [];
    this.displayList = [];
    this.objectCounts = {
      total: 0,
      debris: 0,
      comms: 0,
      probes: 0,
      positioning: 0,
      spaceStations: 0,
      telescopes: 0
    };

    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
 
          let fetchedSatellites = data.satellites;
          for(let i = 0; i < fetchedSatellites.length; i++){
            let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
            this.sourceList.push(satellite);
          }
          this.displayList = this.sourceList.slice(0);
          this.updateCounts();
       }.bind(this));
    }.bind(this));
    
 }

  search(searchTerm: string): void {
    let matchingSatellites: Satellite[] = [];
    searchTerm = searchTerm.toLowerCase();

    for(let i=0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      let type = this.sourceList[i].type.toLowerCase();
      let orbitType = this.sourceList[i].orbitType.toLowerCase();
      if (name.indexOf(searchTerm) >= 0 || type.indexOf(searchTerm) >= 0 || orbitType.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
      }
    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
    this.updateCounts();
    }
  }

  updateCounts(): void {
    this.objectCounts = {
      total: 0,
      debris: 0,
      comms: 0,
      probes: 0,
      positioning: 0,
      spaceStations: 0,
      telescopes: 0
    };
    for(let i=0; i < this.displayList.length; i++){
      this.objectCounts.total++;
      switch (this.displayList[i].type) {
        case "Communication":
          this.objectCounts.comms++;
          break;
        case "Space Debris":
          this.objectCounts.debris++;
          break;
        case "Positioning":
          this.objectCounts.positioning++;
          break;
        case "Space Station":
          this.objectCounts.spaceStations++;
          break;
        case "Probe":
          this.objectCounts.probes++;
          break;
        case "Telescope":
          this.objectCounts.telescopes++;
      }
    }
    
  }
}
