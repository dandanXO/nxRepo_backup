export const renderByRWD = (renderElements: {
  mobile: React.ReactElement;
  tablet: React.ReactElement;
  desktop: React.ReactElement;
}, device: {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}) => {
  if (device.isMobile) {
    return renderElements.mobile;
  } else if (device.isTablet) {
    return renderElements.tablet;
  } else if (device.isDesktop) {
    return renderElements.desktop;
  }
}
