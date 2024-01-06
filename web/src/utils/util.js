import {isFunction} from "lodash"

export const LOG_LEVEL = Object.freeze({
	DEBUG: Symbol("debug"),
    INFO: Symbol("info"),
	WARNING: Symbol("warning"),
	ERROR: Symbol("error"),
	CRITICAL: Symbol("critical")
})

export function logF(message,level=LOG_LEVEL.INFO){
    if (isFunction(window?.pywebview?.api?.log)) {
        window.pywebview.api.log(message, level);
    }
    else {
        switch(level){   
            case LOG_LEVEL.INFO:
                console.info(message);break;
            case LOG_LEVEL.WARNING:
                console.warn(message); break;
            case LOG_LEVEL.ERROR:
            case LOG_LEVEL.CRITICAL:
                console.error(message); break;
            default:
            case LOG_LEVEL.DEBUG:
                console.log(message); break;
        }
    }
}