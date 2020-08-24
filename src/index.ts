function convertMultipleSalesNavigatorLinks(salesNavigatorLinks: string[]) : string[]{
    return salesNavigatorLinks.map((item: string) => {
        return convertSalesNavigatorLink(item);
    })
}
function convertSalesNavigatorLink(link: string){
    return link.replace("sales/people", "in").split(",")[0];
}

const links = ["https://www.linkedin.com/sales/people/ACwAAACAlGcB3ekSocf6RLAcBY6T8cxs85iszb0,NAME_SEARCH,1eb2?_ntb=xfImurByQtaDeDyrb9pJmg%3D%3D", "https://www.linkedin.com/sales/people/ACwAAADesZ8BkzsAiMtKrLgIbVOh23MGN9mPUXM,NAME_SEARCH,OCaE?_ntb=inVK0P7mS3qRTYjpxGalTg%3D%3D"];

console.log(convertMultipleSalesNavigatorLinks(links));