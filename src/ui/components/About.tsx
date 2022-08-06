import useHashNav from "../hooks/useHashNav"
import "./About.css"
import AboutContent from "./dialogContent/AboutContent"
import Dialog from "./presentation/Dialog"
import Link from "./presentation/Link"

const About = () => {
    const [dialogOpen, back] = useHashNav("#about-modal")
    return (
        <>
            <div className="about">
                <Link href="#about-modal">About</Link>
            </div>
            <Dialog open={dialogOpen} onClose={back} title="About">
                <AboutContent />
            </Dialog>
        </>
    )
}

export default About
