import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimeDetails, AnimeDetailsRequest } from '@js-camp/core/models/anime-details';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';
import { ErrorMessage } from '@js-camp/core/models/validation-error-response';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';
import { AnimeType } from '@js-camp/core/utils/types/animeType';

@Component({
  selector: 'camp-anime-edit-form',
  templateUrl: './anime-edit-form.component.html',
  styleUrls: ['./anime-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditFormComponent implements OnInit {

  @Input() public onSubmit: (animeData: AnimeDetailsRequest) => ErrorMessage;

  @Input() public animeData: AnimeDetails;

  public readonly editForm: FormGroup;

  public currentAnimeGenres: Genre[] = [];

  public currentAnimeStudios: Studio[] = [];

  public readonly animeTypes = Object
    .values(AnimeType)
    .filter(element => typeof element === 'string');

  public readonly animeStatuses = Object
    .values(AnimeStatus)
    .filter(element => typeof element === 'string');

  public constructor(
    formBuilder: FormBuilder,
  ) {

    this.editForm = formBuilder.group({
      titleEnglish: ['', [Validators.required]],
      titleJapanese: ['', [Validators.required]],
      synopsis: ['', [Validators.required]],
      airedStart: [''],
      airedEnd: [''],
      image: ['', [Validators.required]],
      trailerYoutubeId: [''],
      status: ['', [Validators.required]],
      type: ['', [Validators.required]],
      isAiring: ['', [Validators.required]],
      genres: ['', [Validators.required]],
      studios: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {

    this.currentAnimeGenres = [...this.animeData.genresData];
    this.currentAnimeStudios = [...this.animeData.studiosData];

    const { controls } = this.editForm;
    controls['titleEnglish'].setValue(this.animeData.titleEnglish);
    controls['titleJapanese'].setValue(this.animeData.titleJapanese);
    controls['synopsis'].setValue(this.animeData.synopsis);
    controls['airedStart'].setValue(this.animeData.aired.start);
    controls['airedEnd'].setValue(this.animeData.aired.end);
    controls['image'].setValue(this.animeData.image);
    controls['trailerYoutubeId'].setValue(this.animeData.trailerYoutubeId);
    controls['status'].setValue(this.animeData.status);
    controls['type'].setValue(this.animeData.type);
    controls['isAiring'].setValue(this.animeData.isAiring);
    controls['genres'].setValue(this.currentAnimeGenres);
    controls['studios'].setValue(this.currentAnimeStudios);
  }

  public handleSubmit(): void {

  }
}
