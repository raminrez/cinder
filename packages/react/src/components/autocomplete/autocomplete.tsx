"use client";

import {
  Autocomplete as RACAutocomplete,
  type AutocompleteProps as RACAutocompleteProps,
} from "react-aria-components";

export interface AutocompleteProps<T extends object = object> extends RACAutocompleteProps<T> {}

export function Autocomplete<T extends object = object>({ children, ...props }: AutocompleteProps<T>) {
  return <RACAutocomplete {...props}>{children}</RACAutocomplete>;
}
