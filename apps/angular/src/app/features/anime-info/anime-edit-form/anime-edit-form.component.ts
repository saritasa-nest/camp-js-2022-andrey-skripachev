import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AnimeDetails } from '@js-camp/core/models/anime-details';

@Component({
  selector: 'camp-anime-edit-form',
  templateUrl: './anime-edit-form.component.html',
  styleUrls: ['./anime-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditFormComponent {

  @Input() public animeData: AnimeDetails;

}
