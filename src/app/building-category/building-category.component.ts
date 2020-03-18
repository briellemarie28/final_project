import { Component, OnInit, Input } from '@angular/core';
import { PermitsAPIService } from '../permits-api.service';

@Component({
  selector: 'building-category',
  templateUrl: './building-category.component.html',
  styleUrls: ['./building-category.component.css']
})

export class BuildingCategoryComponent implements OnInit {
  @Input() permit;
  @Input() post;
  @Input() fave: boolean = false;

  BPFavoritesList: any;
  permitList = [];
  getPermitsAPI;
  searchResults: any;
  permitAddress: string;

  constructor(public PermitsAPIService: PermitsAPIService) { }

  ngOnInit(): void {
    this.fave = this.PermitsAPIService.isAFavorite(this.permit);
  }

  // need to figure out how to display search results
  filterAddress() {
    this.PermitsAPIService.filterAddress(this.permitAddress).subscribe((data: any) => this.searchResults = data);
    console.log(this.searchResults);
  }


  addBPItem(permit) {
    this.PermitsAPIService.addToBPFavoritesList(permit);
    this.fave = true;
  }

  removeBPItem(permit) {
    this.PermitsAPIService.removeFromBPFavoritesList(permit);
    this.fave = false;
  }

  formatDate(rawDate: string): string {
    if (rawDate === null) {
      return "N/A";
    }

    const newDate = new Date(rawDate);
    return newDate.toLocaleDateString();
  }
}
