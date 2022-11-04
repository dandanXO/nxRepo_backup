export interface InfiniteScrollInstanceInterface {
    infiniteScrollRef: HTMLElement;
    instance: {
        scrollHeight: () => void;
        scrollBy: (options: {top?: number; left?: number}) => void;
        scroll: (options: {top?: number; left?: number}) => void;
        update: () => void;
    };
}
