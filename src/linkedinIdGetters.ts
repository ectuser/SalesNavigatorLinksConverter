import {ISalesNavigatorConverterOptions, salesNavigatorConverterDefaultOptions} from "./salesNavigatorConverterOptions"
import { RegexMatchError } from "./RegexMatchError";
function getMultipleLinkedinIds(links: string[], options: ISalesNavigatorConverterOptions = salesNavigatorConverterDefaultOptions): string[]{
    options = {...salesNavigatorConverterDefaultOptions, ...options};
    let ids  = [];

    for (let link of links){

    }
}

function getLinkedinId(link: string){
    // linkedin link example - https://www.linkedin.com/in/melindagates/
    let salesNavRegex = /.*linkedin.com\/sales\/people\/.+/;
    let linkedinRegex = /.*linkedin.com\/in\/.+/;
    if (salesNavRegex.test(link)){
        
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
