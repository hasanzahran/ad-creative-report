import React from 'react';

const Iframe: React.FC<any> = ({iframeData}) => {

    return (
        <div className={"iframe-container flex"}>
            {iframeData?.length > 0 && iframeData?.map((iframe: { width: string | number | undefined; height: string | number | undefined; src: string | undefined; }, index: any) => (
                <div key={index + iframe.height} className={"iframe-card"}>
                    <iframe title={`iframe_${index}`} width={iframe.width} height={iframe.height} src={iframe.src} frameBorder="0" style={{left: iframe.width +'px'}} />
                </div>
            ))}
        </div>
    );

}

export default Iframe;