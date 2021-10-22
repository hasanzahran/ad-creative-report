export const MAIN_URL = `https://platform.pearmill.com/tests`;

export const fixData = (data:any) => {
    const iframeData = [];
    for (let item in data) {
        let tempObj = {width:null,height:null,src:null};
        let srcWithQuotes = data[item].iframe_preview.match(/src=([^\s]*)\s/)[1];
        let width = data[item].iframe_preview.match(/width=([^\s]*)\s/)[1];
        let height = data[item].iframe_preview.match(/height=([^\s]*)\s/)[1];
        tempObj.width = width.substring(1,width.length - 1);
        tempObj.height = height.substring(1,height.length - 1);
        tempObj.src = srcWithQuotes.substring(1,srcWithQuotes.length - 1).replace("amp;", "");
        iframeData.push(tempObj);
    }
    return iframeData;
}