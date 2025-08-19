import React,{JSX} from "react"
import { ErrorMessage } from "../../types/fetch"
import simpleProgres from "./components/defaultProgress"
import ErrorDisplay from "../../widgets/error-display/ErrorDisplay"

const createErrorComponent = (
    errorElement: React.ComponentType<ErrorMessage> = ErrorDisplay,
    errorMessage: ErrorMessage
) => {
    return React.createElement(errorElement, errorMessage)
}

const createLoadingComponent = (loadingElement: JSX.Element=simpleProgres) => {
    return loadingElement
}

export {createErrorComponent,createLoadingComponent}