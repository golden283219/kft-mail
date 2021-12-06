
import { Keyboard } from 'react-native';

export const getNotLastInputProps = ( context, nextFormItem, keyboardAwareScrollView ) => ({
  returnKeyType: 'next',
  onSubmitEditing: () => {

    if( typeof( nextFormItem ) === 'function' ) {
      nextFormItem();
    } else {
      const nextInput = context[ nextFormItem ];
      if( nextInput ) {
        nextInput.focus();
        // if( keyboardAwareScrollView ) keyboardAwareScrollView.scrollToFocusedInput( nextInput );
      }
    }
  },
});

export function dismissAndScrollToEnd( keyboardAwareScrollView ) {
  setTimeout(
    () => {
      Keyboard.dismiss();
    },
    1
  );
  setTimeout(
    () => {
      keyboardAwareScrollView && keyboardAwareScrollView.scrollToEnd();
    },
    1
  );
};

export const isEmailValid = ( rawEmail ) => (
  !!rawEmail && ( /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/ ).test( rawEmail )
);

export const capitalize = ( rawStr ) => (
  rawStr && rawStr.length > 1
    ? rawStr[0].toUpperCase() + rawStr.slice(1)
    : rawStr
);

// If array have few items with equal id, so:
// If isUseLastRepeatingItem is TRUE, result array will have last of this items
// If isUseLastRepeatingItem is FALSE, result array will have first of this items
export const getUniqueItems = ( items, isUseLastRepeatingItem = true, uniqueFiledGetter = ( item ) => item.id ) => {
  let repeatingArray = [];

  items.forEach(( item ) => {
    const repeatingData = repeatingArray.find(( repeatingItem ) => repeatingItem.name === uniqueFiledGetter( item ));
    if( repeatingData ) repeatingData.items.push( item );
    else repeatingArray.push({ name: uniqueFiledGetter( item ), items: [ item ]});
  });

  return repeatingArray.map(( repeatingItem ) => (
    isUseLastRepeatingItem
      ? repeatingItem.items[ repeatingItem.items.length - 1 ]
      : repeatingItem.items[ 0 ]
  ));
};