import {ISalesNavigatorConverterOptions, salesNavigatorConverterDefaultOptions} from "./salesNavigatorConverterOptions";
import { RegexMatchError } from "./RegexMatchError";
import { getMultipleLinkedinIds } from "./linkedinIdGetters";
function convertMultipleSalesNavigatorLinks(salesNavigatorLinks: string[], options: ISalesNavigatorConverterOptions = salesNavigatorConverterDefaultOptions) : string[]{
    options = {...salesNavigatorConverterDefaultOptions, ...options};
    console.log(options);
    let links = [];
    for (let link of salesNavigatorLinks){
        let salesNavigatorLink = "";
        try {
            salesNavigatorLink = convertSalesNavigatorLink(link);
        } catch (error) {
            if (error instanceof RegexMatchError && !options.strictMode){
                if (options.skipInvalidURLs === true){
                    continue;
                }
                else if (!options.skipInvalidURLs){
                    salesNavigatorLink = "-1";
                }
                else if (options.skipInvalidURLs){
                    salesNavigatorLink = options.skipInvalidURLs;
                }
            }
            else{
                throw error;
            }
        }
        links.push(salesNavigatorLink);
    }
    return links;
}
function convertSalesNavigatorLink(link: string){
    // example - https://www.linkedin.com/sales/people/ACwAAADesZ8BkzsAiMtKrLgIbVOh23MGN9mPUXM,NAME_SEARCH,OCaE?_ntb=inVK0P7mS3qRTYjpxGalTg%3D%3D
    let re = /.*linkedin.com\/sales\/people\/.+/;
    if (!re.test(link)){
        throw new RegexMatchError("Link does not fit sales nav link template");
    }
    // re.test(String(email).toLowerCase());
    return link.replace("sales/people", "in").split(",")[0];
}

const links = ["https://www.linkedin.com/sale/people/ACwAAACAlGcB3ekSocf6RLAcBY6T8cxs85iszb0,NAME_SEARCH,1eb2?_ntb=xfImurByQtaDeDyrb9pJmg%3D%3D", 
"https://www.linkedin.com/sales/people/ACwAAADesZ8BkzsAiMtKrLgIbVOh23MGN9mPUXM,NAME_SEARCH,OCaE?_ntb=inVK0P7mS3qRTYjpxGalTg%3D%3D",
"https://www.linkedin.com/in/melindagates/"];

console.log(convertMultipleSalesNavigatorLinks(links, {skipInvalidURLs: true}));