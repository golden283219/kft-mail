/**
 *
 * @flow
 */

import type { ElementRef, Ref } from 'react';

import Input from './index';

export type InputType = 'box';

export type InputElementRef = ElementRef<typeof Input>;

export type SpecialInputProps = {
  type?: InputType,
  title?: string,
  inputRef: Ref<typeof Input>,
  value: ?string,
};
