import DialogContent from "./DialogContent"
import "./AboutContent.css"
import Link from "../presentation/Link"

const AboutContent = () => {
    return (
        <DialogContent className="about-content">
            <br />
            <p>
                Made by&nbsp;
                <Link
                    href="https://twitter.com/Fischinator"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    fischi
                </Link>
            </p>
            <p>
                <Link
                    href="https://github.com/fischi1/notion-graph"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on GitHub
                </Link>
            </p>
            <p>
                <Link
                    href="https://lukasfischer.me"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    lukasfischer.me
                </Link>
            </p>
        </DialogContent>
    )
}

export default AboutContent
