import { twMerge } from 'tailwind-merge';

type Value = string | undefined | null;
type Tuple = [string, boolean];
type Argument = Value | Tuple | Argument[];

const tcx = (...args: Argument[]): string => {
  const classString = args.reduce((acc, current) => {
    if (current && typeof current === 'string') return `${acc} ${current} `;
    if (current && typeof current === 'object' && current[1])
      return `${acc} ${current[0]} `;

    return acc;
  }, '');
  return twMerge(classString as string);
};

export { tcx };
