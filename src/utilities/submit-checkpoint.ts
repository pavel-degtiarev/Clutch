export function submitCheckpoint(
  comparator: () => boolean, message: string): boolean {

	if (!comparator()) {
		alert(message);
		return false;
	}
	return true;
}
