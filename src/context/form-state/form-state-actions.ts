import { TargetFormState } from "../../HOC/with-validate-submit/with-validate-submit";
import { FormStateAction, FormStateKeys } from "./form-state-types";

export default function updateForm(key: FormStateKeys, payload: TargetFormState): FormStateAction {
  return { key, payload };
}
