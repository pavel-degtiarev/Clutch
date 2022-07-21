import { TargetFormState } from "../../HOC/with-validate-submit/with-validate-check";
import { FormStateAction, FormStateKeys } from "./form-state-types";

export default function updateForm(key: FormStateKeys, payload: TargetFormState): FormStateAction {
  return { key, payload };
}
