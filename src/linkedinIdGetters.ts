import {ISalesNavigatorConverterOptions, salesNavigatorConverterDefaultOptions} from "./salesNavigatorConverterOptions"
import { RegexMatchError } from "./RegexMatchError";
export function getMultipleLinkedinIds(links: string[], options: ISalesNavigatorConverterOptions = salesNavigatorConverterDefaultOptions): string[]{
    options = {...salesNavigatorConverterDefaultOptions, ...options};
    let ids = [];

    for (let link of links){
        let newId = "";
        try {
            newId = getLinkedinId(link);   
        } catch (error) {
            if (error instanceof RegexMatchError && !options.strictMode){
                if (options.skipInvalidURLs === true){
                    continue;
                }
                else if (!options.skipInvalidURLs){
                    newId = "-1";
                }
                else if (options.skipInvalidURLs){
                    newId = options.skipInvalidURLs;
                }
            }
            else{
                throw error;
            }
        }
        ids.push(newId);
    }
    return ids;
}

function getLinkedinId(link: string){
    // linkedin link example - https://www.linkedin.com/in/melindagates/
    let salesNavRegex = /.*linkedin.com\/sales\/people\/.+/;
    let linkedinRegex = /.*linkedin.com\/in\/.+/;
    if (salesNavRegex.test(link)){
        return getLinkedinIdSalesNavLink(link);
    }
    else if (linkedinRegex.test(link)){
        return getLinkedinIdLinkedinLink(link);
    }
    else{
        throw new RegexMatchError("Link does not fit sales nav link template");
    }

}

function getLinkedinIdLinkedinLink(link: string): string{
    let sFirst = link.split("?")[0];
	let sSecond = sFirst.replace("https://www.linkedin.com/in/", "");
	let sID = sSecond.split("/")[0];
	return sID;
}

function getLinkedinIdSalesNavLink(link: string): string{
    // example - https://www.linkedin.com/sales/people/ACwAAADesZ8BkzsAiMtKrLgIbVOh23MGN9mPUXM,NAME_SEARCH,OCaE?_ntb=inVK0P7mS3qRTYjpxGalTg%3D%3D
    let sFirst = link.split("?")[0];
	let sSecond = sFirst.replace("https://www.linkedin.com/sales/people/", "");
	let sID = sSecond.split(",")[0];
	return sID;
}
