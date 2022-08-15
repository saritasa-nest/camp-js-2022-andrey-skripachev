import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/** Pipe to transform resource url to safe resource url. */
@Pipe({
  name: 'safeResource',
})
export class SafeResourcePipe implements PipeTransform {

  public constructor(
    private readonly sanitizer: DomSanitizer,
  ) {}

  /**
   * Transforms value to safe resource url.
   * @inheritdoc
   */
  public transform(value: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
