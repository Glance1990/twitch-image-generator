import { useState } from 'react'
import Canvas from '../Canvas/Canvas'
import { DemonstrationPanelProps } from './DemonstrationPanel.props'
import { useAppSelector } from '../../hooks/redux'

// Styles
import Styling from './DemonstrationPanel.styles'

function DemonstrationPanel({
    href,
    canvasRef,
    saveImage,
    className,
}: DemonstrationPanelProps): JSX.Element {
    const { panelHeight } = useAppSelector((state) => state.canvasReducer)
    const config = useAppSelector((state) => state.canvasReducer)

    function download(content: object, fileName: string, contentType: string) {
        const a = document.createElement('a')
        const file = new Blob([JSON.stringify(content, null, 2)], {
            type: contentType,
        })
        a.href = URL.createObjectURL(file)
        a.download = fileName
        a.click()
    }

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.')
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files

        if (file && file[0].type === 'application/json') {
            const reader = new FileReader()

            const arr = []

            reader.onload = (event) => {
                if (event && event.target && event.target.result) {
                    const someString = String(event.target.result)
                    const someObj = JSON.parse(someString)
                    return someObj
                }
            }
            const obj = reader.readAsText(file[0])
            console.log(obj)
        } else {
            console.log('something not right here')
        }
    }

    return (
        <div className={`${className} col demonstration-tab`}>
            <h2 className="nod_title">Live View & Download</h2>
            <p className="nod_text">
                Check your design and download transparent .PNG panels.
            </p>
            <Canvas panelHeight={panelHeight} references={canvasRef} />
            <a
                href={href}
                className="button save-image"
                download="your-image.png"
                onClick={saveImage}
            >
                Save panel image
            </a>
            <button
                type="button"
                onClick={() =>
                    download(config, 'json.json', 'application/json')
                }
            >
                Download settings
            </button>

            <input
                type="file"
                onChange={(e) => handleFileInput(e)}
                accept="application/json"
            />
        </div>
    )
}

export default Styling(DemonstrationPanel)
