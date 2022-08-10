import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeDetails, AnimeDetailsRequest } from '@js-camp/core/models/anime-details';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';
import { ErrorMessage } from '@js-camp/core/models/validation-error-response';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { AnimeService } from 'apps/angular/src/core/services/anime.service';
import { switchMap, Observable, Subscription, startWith, tap, debounceTime } from 'rxjs';

const MAXIMUM_AUTOCOMPLETE_COUNT = 3;

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

  private readonly subscriptions = new Subscription();

  public readonly searchAnimeGenreFormControl = new FormControl<string>('', {
    nonNullable: true,
    updateOn: 'change',
  });

  public readonly searchingAnimeGenres$: Observable<readonly Genre[]>;

  public readonly searchAnimeStudioFormControl = new FormControl<string>('', {
    nonNullable: true,
    updateOn: 'change',
  });

  public readonly searchingAnimeStudios$: Observable<readonly Studio[]>;

  public readonly animeTypes = Object
    .values(AnimeType)
    .filter(element => typeof element === 'string');

  public readonly animeStatuses = Object
    .values(AnimeStatus)
    .filter(element => typeof element === 'string');

  private searchingGenre = '';

  private searchingStudio = '';

  public constructor(
    private readonly animeService: AnimeService,
    formBuilder: FormBuilder,
  ) {

    const searchGenreChange$ = this.searchAnimeGenreFormControl.valueChanges.pipe(
      startWith(this.searchAnimeGenreFormControl.value),
    )

    this.searchingAnimeGenres$ = searchGenreChange$.pipe(
      debounceTime(100),
      switchMap(name => {
        this.searchingGenre = name;

        return this.animeService.getGenresByName(name, MAXIMUM_AUTOCOMPLETE_COUNT);
      })
    )

    const searchStudioChanges$ = this.searchAnimeStudioFormControl.valueChanges.pipe(
      startWith(this.searchAnimeStudioFormControl.value),
      tap(() => console.log(this.searchAnimeStudioFormControl))
    );

    this.searchingAnimeStudios$ = searchStudioChanges$.pipe(
      debounceTime(100),
      switchMap(name => {
        this.searchingStudio = name;
        return this.animeService.getStudiosByName(name, MAXIMUM_AUTOCOMPLETE_COUNT);
      }),
    )

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
    console.table(this.editForm.value);

  }

  public removeGenre(currentId: number): void {
    const genreId = this.currentAnimeGenres.findIndex(({id}) => currentId === id);

    this.currentAnimeGenres.splice(genreId, 1);
  }

  public removeStudio(currentId: number): void {
    const studioId = this.currentAnimeStudios.findIndex(({id}) => currentId === id);

    this.currentAnimeStudios.splice(studioId, 1);
  }

  public addGenre(genre: Genre): void {
    if (this.currentAnimeGenres.some(({ id }) => genre.id === id)) {
      return
    }
    this.currentAnimeGenres.push(genre);
    this.searchAnimeGenreFormControl.setValue('');
  }

  public addStudio(studio: Studio): void {
    if (this.currentAnimeStudios.some(({ id }) => studio.id === id)) {
      return
    }
    this.currentAnimeStudios.push(studio);
    this.searchAnimeStudioFormControl.setValue('');
  }

  public createGenre(): void {
    this.subscriptions.add(this.animeService
      .createGenre(this.searchingGenre)
      .pipe(
        tap(newGenre => this.addGenre(newGenre)),
      ).subscribe());
  }

  public createStudio(): void {
    this.subscriptions.add(this.animeService
      .createStudio(this.searchingStudio)
      .pipe(
        tap(newStudio => this.addStudio(newStudio)),
      ).subscribe());
  }
}
