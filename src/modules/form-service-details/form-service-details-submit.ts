import { DetailsFormState } from "../../context/form-state/form-init-states";
import { prepareForm, detailsFormFinalState } from "../../HOC/with-validate-submit/submit-form";
import { formServiceDetailsCheckpoints } from "./form-service-details-checkpoints";
import { convertServiceDetailsFields } from "./form-service-details-convert-fields";

export default async function submitServiceDetailsForm(state: DetailsFormState): Promise<boolean> {
  const finalFormState = prepareForm<DetailsFormState, detailsFormFinalState>(
    state, formServiceDetailsCheckpoints, convertServiceDetailsFields);
  
  return !!finalFormState;
}
