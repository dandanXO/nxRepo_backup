export interface ITheme {
  [key: string]: string;
}

// TODO: refactor
export interface IThemes {
  india: {
    [key: string]: ITheme;
  };
  pakistan: {
    [key: string]: ITheme;
  };
}

export interface IMappedTheme {
  [key: string]: string | null;
}
