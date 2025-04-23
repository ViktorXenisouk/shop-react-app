import { JSX, Children } from "react"

type ScrollableObjectProps = {
    containerCSS: string;
    children: JSX.Element[]
    count: number
}

const ScrollableObject = ({ children, count,containerCSS }: ScrollableObjectProps) => {
    return (
        <div className={(containerCSS)}>
            {Children.map(children, (child,i) => (i==-1 || i <= count) ? child : '')}
        </div>
    )
}

export default ScrollableObject