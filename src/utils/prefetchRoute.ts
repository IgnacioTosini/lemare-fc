export const prefetchRoute = (importFunc: () => Promise<unknown>) => {
    importFunc();
}
