import { StaticImageData } from "next/image"

interface DeviceMockImageStyle {
    height: string
    top: string
    marginTop?: string
}

interface DeviceMockImage {
    SRC: StaticImageData,
    STYLE: DeviceMockImageStyle
}

interface DeviceImages {
    DEVICE_MOCK: DeviceMockImage
}

export default interface DeveloperSettings {
    ASPECT_RATIO: number
    //Height DOES NOT include device mock
    HEIGHT: string
    // Width includes device mock
    WIDTH: number
    WATERMARK_POSITION: string
    BORDER_RADIUS: string
    LENGTH_LIMIT: number;
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p' | 'l'
    }
    TOP: number;
    SCALE: {
        phone: number,
        tablet: number
    }
    DEVICE_IMAGES?: DeviceImages
}