import {Component, OnInit} from '@angular/core';
import {MediaService} from '../services/media.service';
import {DigitransitService} from '../services/digitransit.service';

@Component({
  selector: 'app-list-media',
  templateUrl: './list-media.component.html',
  styleUrls: ['./list-media.component.scss']
})
export class ListMediaComponent implements OnInit {
  printThis: string;
  mediaArray: any;
  stopArray: any;
  stopName: string;


  constructor(public mediaService: MediaService, public digitransitService: DigitransitService) {
  }

  ngOnInit() {
    this.printThis = this.mediaService.test;
    this.mediaService.getAllMedia().subscribe(
      data => {
        console.log(data);
        this.mediaArray = data;

        /*  Option 1:
        this.mediaArray.forEach((media, index) => {
          const temp = media.filename.split('.');
          const thumbName = (temp[0] + '-tn320.png');
          this.mediaArray[index].thumbnail = thumbName;
        }); */
      }
    );
    console.log(this.digitransitService.getRoutes(this.stopName).subscribe(response => {
      console.log(response['data'].stops);
      this.stopArray = response['data'].stops;
    }));
  }

  // Option 2 if you need this function elsewhere
  thumbnailer(filename: String) {
    const splitFilename = filename.split('.');
    const thumbnailUrl = splitFilename[0] + '-tn320.png';
    return thumbnailUrl;
  }

  getBusRoutes() {
    this.digitransitService.getRoutes(this.stopName).subscribe(result => {
      this.stopArray = result['data'].stops[0].patterns;
    });

  }
}
