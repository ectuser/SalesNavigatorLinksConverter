export interface ISalesNavigatorConverterOptions{
    strictMode: boolean; // if true, main function throws an error if there's a non-sales-navigator-url type
    skipInvalidURLs: string | boolean; // if true - invalid urls will be skipped, false - replace them with -1, any string - replace them with this string
};
export const salesNavigatorConverterDefaultOptions : ISalesNavigatorConverterOptions = {
    strictMode: false,
    skipInvalidURLs: true
};