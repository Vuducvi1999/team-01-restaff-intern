import { Component, OnInit } from '@angular/core';
import { SocialMediaService } from 'src/app/lib/data/services/socialmedia/socialmedia.service';

@Component({
  selector: 'app-update-socialmedias',
  templateUrl: './update-socialmedias.component.html',
  styleUrls: ['./update-socialmedias.component.scss'],
  providers: [SocialMediaService],
})
export class UpdateSocialMediasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
