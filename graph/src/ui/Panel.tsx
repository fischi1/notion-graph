type Props = {
    text: string
}

const Panel = ({ text }: Props) => {
    return <div className="panel">Hello World {text}</div>
}

export default Panel
