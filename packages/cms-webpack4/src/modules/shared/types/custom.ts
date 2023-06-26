export type DeepPartial<T> = T extends Record<any, any>
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;
