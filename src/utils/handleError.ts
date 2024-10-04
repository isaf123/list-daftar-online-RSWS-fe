export function handleError(error: string | { response: any }) {
  if (typeof error == "string") {
    return error;
  }

  return error.response.data;
}
