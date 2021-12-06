import { differenceInHours, formatDistanceStrict, format, parseISO, } from 'date-fns'

export const formatNewsDate = ( rawDate ) => {
  const parsedDate = parseISO( rawDate );
  const diffInHours = differenceInHours( new Date(), parsedDate );

  if( diffInHours < 1 ) {
    return 'now';

  } else if( diffInHours < 24 ) {
    const formateDate = formatDistanceStrict(
      new Date(),
      parsedDate,
      {
        unit: 'hour',
        roundingMethod: 'ceil',
      }
    );

    return `${formateDate} ago`;

  } else {
    return format(
      parsedDate,
      'MM/dd/yyyy'
    );
  }
};