import { HttpProblems, ZuploContext, ZuploRequest } from "@zuplo/runtime";

type GoogleStoragePolicyOptions = {
  bucketName: any;
};

export default async function policy(
  request: ZuploRequest,
  context: ZuploContext,
  options: GoogleStoragePolicyOptions,
  policyName: string,
) {
  // NOTE: policy options should be validated, but to keep the sample short,
  // we are skipping that here.

  // because we will read the body, we need to
  // create a clone of this request first, otherwise
  // there may be two attempts to read the body
  // causing a runtime error
  const clone = request.clone();

  // In this example we assume the body could be text, but you could also
  // request the blob() to handle binary data types like images.
  //
  // This example loads the entire body into memory. This is fine for
  // small payloads, but if you have a large payload you should instead
  // save the body via streaming.
  const body = await clone.text();

  // generate a unique blob name based on the date and requestId
  const objectName = `${Date.now()}-${context.requestId}`;

  const authHeader = request.headers.get("Authorization");

  // This uses simple uploads where the parameters are in the query string, you
  // could also use multipart uploads to set more properties
  // See: https://cloud.google.com/storage/docs/uploading-objects#rest-upload-objects
  const url = new URL(
    `https://storage.googleapis.com/upload/storage/v1/b/${options.bucketName}/o`,
  );
  url.searchParams.set("uploadType", "media");
  url.searchParams.set("name", objectName);

  const response = await fetch(url.toString(), {
    method: "POST",
    body: body,
    headers: {
      // Using the authorization header generated by the previous policy
      authorization: authHeader,
      // change to whatever content type you want to save
      "Content-Type": "text/plain",
    },
  });

  if (response.status > 201) {
    const text = await response.text();
    context.log.error(
      `Error saving file to storage in policy ${policyName}.`,
      text,
    );
    return HttpProblems.internalServerError(request, context, {
      detail: text,
    });
  }

  // continue
  return request;
}
