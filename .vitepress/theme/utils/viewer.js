import Viewer from "viewerjs"

export function initImageViewer(container) {
  const viewer = new Viewer(container, {
    navbar: false,
    toolbar: false,
    title: false,
    tooltip: false,
    movable: false,
    zoomRatio: 0.3,
    maxZoomRatio: 2,
    backdrop: true,
    loading: true,
    transition: true,
    duration: 200,
    filter(img) {
      return img.parentNode.closest(".main")
    },
    shown() {
      viewer.zoomTo(1)
    },
  })
  
  return viewer
} 