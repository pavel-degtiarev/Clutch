export function checkpoint(
  comparator: () => boolean, message: string): boolean {

  if (!comparator()) {
    alert(message);
    return false;
  }
  return true;
}
