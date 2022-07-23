import Heading from "../presentation/Heading"
import Image from "../presentation/Image"
import A01_settingsMembers from "./images/A01_settingsMembers.png"
import A02_settings from "./images/A02_settings.png"
import A03_exportOptions from "./images/A03_exportOptions.png"
import A04_chooseFile from "./images/A04_chooseFile.png"
import B01_pageMenu from "./images/B01_pageMenu.png"
import B02_exportOptions from "./images/B02_exportOptions.png"
import "./SelectFileDialogContent.css"

const SelectFileDialogContent = () => {
    const finalListItem = (
        <li>
            Go back to this application and use <i>Choose file</i> to select the
            zip file or drag it onto the window
            <br />
            <Image
                src={A04_chooseFile}
                alt="TODO"
                width={429}
                maxWidth={360}
                height={180}
                responsive
            />
        </li>
    )

    return (
        <div className="select-file-dialog-content">
            <p>
                This tool needs an export from your Notion workspace to generate
                a graph. You can choose whether you want to use your whole
                workspace or just a selection of your pages.
            </p>
            <Heading level={2}>Whole workspace</Heading>
            <ol>
                <li>
                    Go to <i>Settings & Members</i>
                    <br />
                    <Image
                        src={A01_settingsMembers}
                        alt="TODO"
                        width={265}
                        height={145}
                    />
                </li>
                <li>
                    Under the tab <i>Settings</i>, press{" "}
                    <i>Export all workspace content</i>
                    <br />
                    <Image
                        src={A02_settings}
                        alt="TODO"
                        width={521}
                        height={349}
                        responsive
                    />
                </li>
                <li>
                    Choose the following options in the dialog
                    <br />
                    <Image
                        src={A03_exportOptions}
                        alt="Export format: HTML; Include content: No files or images; Create folder for subpages: ON"
                        width={329}
                        height={196}
                    />
                </li>
                <li>
                    Wait until the export is finished and download the zip-file
                </li>
                {finalListItem}
            </ol>
            <Heading level={2}>Subset of your workspace</Heading>
            <ol>
                <li>
                    Navigate to the page of which you want to create a graph for
                </li>
                <li>
                    Open the menu on the top right and select <i>Export</i>
                    <br />
                    <Image
                        src={B01_pageMenu}
                        alt="TODO"
                        width={241}
                        height={242}
                    />
                </li>
                <li>
                    Choose the following options in the dialog
                    <br />
                    <Image
                        src={B02_exportOptions}
                        alt="Export format: HTML; Include content: No files or images; Include subpages: ON; Create folder for subpages: ON"
                        width={334}
                        height={232}
                    />
                </li>
                <li>
                    Wait until the export is finished and download the zip-file
                </li>
                {finalListItem}
            </ol>
        </div>
    )
}

export default SelectFileDialogContent
