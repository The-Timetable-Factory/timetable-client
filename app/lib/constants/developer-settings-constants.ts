import DeveloperSettings from '../interfaces/developer-settings-interfaces'
import iPhone14LockScreen from '@/public/iphone-14-lock-screen.png'
import iPad13 from '@/public/ipad-pro-13.png'


export const iPhoneSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 9 / 19.5,
    HEIGHT: "699px",
    WIDTH: 404,
    WATERMARK_POSITION: "10px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 460,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
    TOP: 184,
    SCALE: {
        phone: 1,
        tablet: 1
    },
    DEVICE_IMAGES: {
        DEVICE_MOCK: {
            SRC: iPhone14LockScreen,
            STYLE: {
                height: "774px",
                top: "-48px"
            }
        }
    },
}

export const iPhoneWithWidgetsSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 9 / 19.5,
    HEIGHT: "699px",
    WIDTH: 404,
    WATERMARK_POSITION: "18px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 392,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
    TOP: 249,
    SCALE: {
        phone: 1,
        tablet: 1
    },
    DEVICE_IMAGES: {
        DEVICE_MOCK: {
            SRC: iPhone14LockScreen,
            STYLE: {
                top: "-48px",
                height: "774px"
            }
        }
    },
}

export const iPadSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 199 / 139,
    HEIGHT: "610px",
    WIDTH: 949,
    WATERMARK_POSITION: "10px",
    BORDER_RADIUS: "24px",
    LENGTH_LIMIT: 405,
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'l'
    },
    TOP: 170,
    SCALE: {
        phone: 0.45,
        tablet: 1
    },
    DEVICE_IMAGES: {
        DEVICE_MOCK: {
            SRC: iPad13,
            STYLE: {
                top: "-48px",
                height: "734px"
            }
        }
    }
}

export const letterSettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 8.5 / 11,
    HEIGHT: "800px",
    WIDTH: 640,
    WATERMARK_POSITION: "14px",
    BORDER_RADIUS: "10px",
    LENGTH_LIMIT: 706,
    TOP: 41,
    SCALE: {
        phone: 0.64,
        tablet: 1
    },
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
}

export const a4SettingsConstants: DeveloperSettings = {
    ASPECT_RATIO: 210 / 297,
    HEIGHT: "880px",
    WIDTH: 640,
    WATERMARK_POSITION: "14px",
    BORDER_RADIUS: "10px",
    LENGTH_LIMIT: 790,
    TOP: 49,
    SCALE: {
        phone: 0.64,
        tablet: 1
    },
    PDF_SETTINGS: {
        PAGE_ORIENTATION: 'p'
    },
}