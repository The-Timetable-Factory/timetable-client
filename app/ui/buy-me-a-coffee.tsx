'use client';

export default function BuyMeACoffee() {
    const userName = "thetimetablefactory";
    const path = `https://www.buymeacoffee.com/widget/page/${userName}?description=Support%20me%20on%20Buy%20me%20a%20coffee!&color=%235F7FFF`;
    return (

        <iframe style={{ height: "100%", border: "none", borderRadius: "20px", opacity: 0.8, backgroundColor: "#FFFFFF" }} src={path} />

    );
}
