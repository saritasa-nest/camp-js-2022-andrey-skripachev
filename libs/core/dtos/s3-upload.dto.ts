export interface S3UploadDto {
  readonly policy: string;
  readonly success_action_status: string;
  readonly 'x-amz-credential': string;
  readonly 'x-amz-date': string;
  readonly 'x-amz-signature': string;
  readonly 'x-amz-algorithm': string;
  readonly form_action: string;
  readonly key: string;
  readonly acl: string;
  readonly 'x-amz-security-token': string;
  readonly 'content-type': string;
  readonly 'Cache-Control': string;
  readonly 'Content-Disposition': string;
}
