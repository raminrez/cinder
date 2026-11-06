import fieldFormLight from "./references/field-form-light.webp";
import fieldErrorLight from "./references/field-error-light.webp";
import fieldQueueLight from "./references/field-queue-light.webp";
import fieldDialogLight from "./references/field-dialog-light.webp";
import fieldFormDark from "./references/field-form-dark.webp";
import fieldErrorDark from "./references/field-error-dark.webp";
import fieldQueueDark from "./references/field-queue-dark.webp";
import fieldDialogDark from "./references/field-dialog-dark.webp";
import relayFormLight from "./references/relay-form-light.webp";
import relayErrorLight from "./references/relay-error-light.webp";
import relayQueueLight from "./references/relay-queue-light.webp";
import relayDialogLight from "./references/relay-dialog-light.webp";
import relayFormDark from "./references/relay-form-dark.webp";
import relayErrorDark from "./references/relay-error-dark.webp";
import relayQueueDark from "./references/relay-queue-dark.webp";
import relayDialogDark from "./references/relay-dialog-dark.webp";
import indexFormLight from "./references/index-form-light.webp";
import indexErrorLight from "./references/index-error-light.webp";
import indexQueueLight from "./references/index-queue-light.webp";
import indexDialogLight from "./references/index-dialog-light.webp";
import indexFormDark from "./references/index-form-dark.webp";
import indexErrorDark from "./references/index-error-dark.webp";
import indexQueueDark from "./references/index-queue-dark.webp";
import indexDialogDark from "./references/index-dialog-dark.webp";
import carbonFormLight from "./references/carbon-form-light.webp";
import carbonErrorLight from "./references/carbon-error-light.webp";
import carbonQueueLight from "./references/carbon-queue-light.webp";
import carbonDialogLight from "./references/carbon-dialog-light.webp";
import carbonFormDark from "./references/carbon-form-dark.webp";
import carbonErrorDark from "./references/carbon-error-dark.webp";
import carbonQueueDark from "./references/carbon-queue-dark.webp";
import carbonDialogDark from "./references/carbon-dialog-dark.webp";
import herouiFormLight from "./references/heroui-form-light.webp";
import herouiErrorLight from "./references/heroui-error-light.webp";
import herouiQueueLight from "./references/heroui-queue-light.webp";
import herouiDialogLight from "./references/heroui-dialog-light.webp";
import herouiFormDark from "./references/heroui-form-dark.webp";
import herouiErrorDark from "./references/heroui-error-dark.webp";
import herouiQueueDark from "./references/heroui-queue-dark.webp";
import herouiDialogDark from "./references/heroui-dialog-dark.webp";

// Captured at the same 380px specimen width. See references/README.md for provenance.
export const referenceImages = {
  field: {
    light: {
      form: fieldFormLight,
      error: fieldErrorLight,
      queue: fieldQueueLight,
      dialog: fieldDialogLight,
    },
    dark: {
      form: fieldFormDark,
      error: fieldErrorDark,
      queue: fieldQueueDark,
      dialog: fieldDialogDark,
    },
    heights: { form: 468, error: 468, queue: 421, dialog: 526 },
  },
  relay: {
    light: {
      form: relayFormLight,
      error: relayErrorLight,
      queue: relayQueueLight,
      dialog: relayDialogLight,
    },
    dark: {
      form: relayFormDark,
      error: relayErrorDark,
      queue: relayQueueDark,
      dialog: relayDialogDark,
    },
    heights: { form: 492, error: 492, queue: 449, dialog: 550 },
  },
  index: {
    light: {
      form: indexFormLight,
      error: indexErrorLight,
      queue: indexQueueLight,
      dialog: indexDialogLight,
    },
    dark: {
      form: indexFormDark,
      error: indexErrorDark,
      queue: indexQueueDark,
      dialog: indexDialogDark,
    },
    heights: { form: 468, error: 468, queue: 483, dialog: 502 },
  },
  carbon: {
    light: {
      form: carbonFormLight,
      error: carbonErrorLight,
      queue: carbonQueueLight,
      dialog: carbonDialogLight,
    },
    dark: {
      form: carbonFormDark,
      error: carbonErrorDark,
      queue: carbonQueueDark,
      dialog: carbonDialogDark,
    },
    heights: { form: 384, error: 384, queue: 361, dialog: 480 },
  },
  heroui: {
    light: {
      form: herouiFormLight,
      error: herouiErrorLight,
      queue: herouiQueueLight,
      dialog: herouiDialogLight,
    },
    dark: {
      form: herouiFormDark,
      error: herouiErrorDark,
      queue: herouiQueueDark,
      dialog: herouiDialogDark,
    },
    heights: { form: 364, error: 380, queue: 403, dialog: 442 },
  },
};
