export interface DemonstrationPanelProps {
    href: string
    canvasRef: React.RefObject<HTMLCanvasElement>
    panelHeight: number
    className: string
    saveImage: (val: any) => void
}
