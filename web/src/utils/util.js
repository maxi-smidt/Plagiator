import {isFunction} from "lodash"

export function logF(message,level="info"){
    console.log(message)
    if (isFunction(window?.pywebview?.api?.log)) {
        window.pywebview.api.log(message, level);
    }
}