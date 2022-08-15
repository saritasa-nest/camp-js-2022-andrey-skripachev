import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimeDetails } from '@js-camp/core/models/anime-details';
import { Genre } from '@js-camp/core/models/genre';
import { Studio } from '@js-camp/core/models/studio';
import { ErrorMessage } from '@js-camp/core/models/validation-error-response';
import { AnimeStatus } from '@js-camp/core/utils/types/animeStatus';
import { AnimeType } from '@js-camp/core/utils/types/animeType';
import { switchMap, Observable, Subscription, startWith, tap, debounceTime, BehaviorSubject } from 'rxjs';

import { AwsFileLoaderService } from '../../../../core/services/aws-file-loader.service';
import { AnimeService } from '../../../../core/services/anime.service';

const MAXIMUM_AUTOCOMPLETE_COUNT = 3;

/** Anime edit form component. */
@Component({
  selector: 'camp-anime-edit-form',
  templateUrl: './anime-edit-form.component.html',
  styleUrls: ['./anime-edit-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeEditFormComponent implements OnInit {

  /** Form submitting event that reverts validation error. */
  @Input()
  public onSubmit: (animeData: AnimeDetails) => Observable<ErrorMessage | null>;

  /** Default anime data. */
  @Input()
  public animeData: AnimeDetails;

  /** Anime image preview. */
  public readonly animeImagePreview$ = new BehaviorSubject<string | null>(null);

  /** Edit form. */
  public readonly editForm: FormGroup;

  /** Chosen anime genres. */
  public currentAnimeGenres: Genre[] = [];

  /** Chosen anime studios. */
  public currentAnimeStudios: Studio[] = [];

  private readonly subscriptions = new Subscription();

  /** Form control for anime genres. */
  public readonly searchAnimeGenreFormControl = new FormControl<string>('', {
    nonNullable: true,
    updateOn: 'change',
  });

  /** Anime genres using in autocomplete. */
  public readonly searchingAnimeGenres$: Observable<readonly Genre[]>;

  /** Form control for anime studios. */
  public readonly searchAnimeStudioFormControl = new FormControl<string>('', {
    nonNullable: true,
    updateOn: 'change',
  });

  /** Anime studios using in autocomplete. */
  public readonly searchingAnimeStudios$: Observable<readonly Studio[]>;

  /** Anime types. */
  public readonly animeTypes = Object.values(AnimeType);

  /** Anime statuses. */
  public readonly animeStatuses = Object.values(AnimeStatus);

  private searchingGenre = '';

  private searchingStudio = '';

  public constructor(
    private readonly animeService: AnimeService,
    private readonly fileLoader: AwsFileLoaderService,
    formBuilder: FormBuilder,
  ) {

    const searchGenreChange$ = this.searchAnimeGenreFormControl.valueChanges.pipe(
      startWith(this.searchAnimeGenreFormControl.value),
    );

    this.searchingAnimeGenres$ = searchGenreChange$.pipe(
      debounceTime(100),
      switchMap(name => {
        this.searchingGenre = name;

        return this.animeService.getGenresByName(name, MAXIMUM_AUTOCOMPLETE_COUNT);
      }),
    );

    const searchStudioChanges$ = this.searchAnimeStudioFormControl.valueChanges.pipe(
      startWith(this.searchAnimeStudioFormControl.value),
    );

    this.searchingAnimeStudios$ = searchStudioChanges$.pipe(
      debounceTime(100),
      switchMap(name => {
        this.searchingStudio = name;
        return this.animeService.getStudiosByName(name, MAXIMUM_AUTOCOMPLETE_COUNT);
      }),
    );

    this.editForm = formBuilder.group({
      titleEnglish: [''],
      titleJapanese: [''],
      synopsis: ['', [Validators.required]],
      aired: formBuilder.group({
        start: [''],
        end: [''],
      }),
      image: ['', [Validators.required]],
      trailerYoutubeId: [''],
      status: ['', [Validators.required]],
      type: ['', [Validators.required]],
      isAiring: ['', [Validators.required]],
      genresData: [''],
      studiosData: [''],
    });

    this.subscriptions.add(this.editForm.controls['image'].valueChanges.pipe(
      tap(file => {
        if (file instanceof File) {
          this.uploadAnimeImage(file);
        }
      }),
    ).subscribe());
  }

  /**
   * Init edit form.
   * @inheritdoc
   */
  public ngOnInit(): void {

    this.currentAnimeGenres = [...this.animeData.genresData];
    this.currentAnimeStudios = [...this.animeData.studiosData];

    const { controls } = this.editForm;
    controls['titleEnglish'].setValue(this.animeData.titleEnglish);
    controls['titleJapanese'].setValue(this.animeData.titleJapanese);
    controls['synopsis'].setValue(this.animeData.synopsis);
    this.editForm.get(['aired', 'start'])?.setValue(this.animeData.aired.start);
    this.editForm.get(['aired', 'end'])?.setValue(this.animeData.aired.end);
    controls['image'].setValue(this.animeData.image);
    controls['trailerYoutubeId'].setValue(this.animeData.trailerYoutubeId);
    controls['status'].setValue(this.animeData.status);
    controls['type'].setValue(this.animeData.type);
    controls['isAiring'].setValue(this.animeData.isAiring);
    controls['genresData'].setValue(this.currentAnimeGenres);
    controls['studiosData'].setValue(this.currentAnimeStudios);

    this.animeImagePreview$.next(this.animeData.image);
  }

  /** Form submit event. */
  public handleSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }

    const editData = this.editForm.value;

    const genresIdList = editData.genresData.map(({ id }: Genre) => id);
    const studiosIdList = editData.studiosData.map(({ id }: Genre) => id);

    const changedAnimeDetails = new AnimeDetails({
      ...this.animeData,
      ...editData,
      genresIdList,
      studiosIdList,
    });

    this.onSubmit(changedAnimeDetails).subscribe();
  }

  /**
   * Remove genre by id.
   * @param genreId Id of the deleted genre.
   */
  public removeGenre(genreId: number): void {
    const index = this.currentAnimeGenres.findIndex(({ id }) => genreId === id);

    this.currentAnimeGenres.splice(index, 1);
  }

  /**
   * Remove studio by id.
   * @param studioId Id of the deleted studio.
   */
  public removeStudio(studioId: number): void {
    const index = this.currentAnimeStudios.findIndex(({ id }) => studioId === id);

    this.currentAnimeStudios.splice(index, 1);
  }

  /**
   * Adds new genre in genre list.
   * @param genre New genre.
   */
  public addGenre(genre: Genre): void {
    if (this.currentAnimeGenres.some(({ id }) => genre.id === id)) {
      return;
    }
    this.currentAnimeGenres.push(genre);
    this.searchAnimeGenreFormControl.setValue('');
  }

  /**
   * Adds new studio in studio list.
   * @param studio New studio.
   */
  public addStudio(studio: Studio): void {
    if (this.currentAnimeStudios.some(({ id }) => studio.id === id)) {
      return;
    }
    this.currentAnimeStudios.push(studio);
    this.searchAnimeStudioFormControl.setValue('');
  }

  /**
   * Creates new genre and adds it in genre list.
   */
  public createGenre(): void {
    this.subscriptions.add(this.animeService
      .createGenre(this.searchingGenre)
      .pipe(
        tap(newGenre => this.addGenre(newGenre)),
      )
      .subscribe());
  }

  /**
   * Creates new studio and adds it in studio list.
   */
  public createStudio(): void {
    this.subscriptions.add(this.animeService
      .createStudio(this.searchingStudio)
      .pipe(
        tap(newStudio => this.addStudio(newStudio)),
      )
      .subscribe());
  }

  /**
   * Loads file in AWS S3.
   * @param file Current file.
   */
  public uploadAnimeImage(file: File): void {
    this.subscriptions.add(this.fileLoader.uploadImage(file).subscribe(imageUrl => {
      this.animeImagePreview$.next(imageUrl);
      this.editForm.controls['image'].setValue(imageUrl);
    }));
  }
}
