import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { S3UploadDto } from '@js-camp/core/dtos/s3-upload.dto';
import { map, Observable, switchMap } from 'rxjs';
import { XMLParser } from 'fast-xml-parser';

import { AppConfigService } from './app-config.service';

interface S3Response {

  // eslint-disable-next-line jsdoc/require-jsdoc
  readonly PostResponse: {

    /** New anime image location. */
    readonly Location: string;
  };
}

/** AWS file loader. */
@Injectable({
  providedIn: 'root',
})
export class AwsFileLoaderService {

  private readonly s3DirectParamsUrl: URL;

  private readonly bucketName = 'anime_images';

  public constructor(
    private readonly httpClient: HttpClient,
    appConfig: AppConfigService,
  ) {
    this.s3DirectParamsUrl = new URL('s3direct/get_params/', appConfig.apiUrl);
  }

  /**
   * Loads image to AWS.
   * @param file Image file.
   */
  public uploadImage(file: File): Observable<string> {
    return this.httpClient.post<S3UploadDto>(
      this.s3DirectParamsUrl.toString(),
      { dest: this.bucketName, filename: file.name },
    )
      .pipe(
        map(s3Upload => {
          const s3UploadFormData = new FormData();
          s3UploadFormData.append('policy', s3Upload.policy);
          s3UploadFormData.append('success_action_status', s3Upload.success_action_status);
          s3UploadFormData.append('x-amz-credential', s3Upload['x-amz-credential']);
          s3UploadFormData.append('x-amz-date', s3Upload['x-amz-date']);
          s3UploadFormData.append('x-amz-signature', s3Upload['x-amz-signature']);
          s3UploadFormData.append('x-amz-algorithm', s3Upload['x-amz-algorithm']);
          s3UploadFormData.append('key', s3Upload.key);
          s3UploadFormData.append('acl', s3Upload.acl);
          s3UploadFormData.append('x-amz-security-token', s3Upload['x-amz-security-token']);
          s3UploadFormData.append('file', file);

          return {
            formAction: s3Upload.form_action,
            formData: s3UploadFormData,
          };
        }),
        switchMap(({ formAction, formData }) => this.httpClient.post(formAction, formData, { responseType: 'text' })),
        map(response => {
          const xmlParser = new XMLParser();
          const parsedResponse = xmlParser.parse(response) as S3Response;

          return parsedResponse.PostResponse.Location;
        }),
      );
  }
}
