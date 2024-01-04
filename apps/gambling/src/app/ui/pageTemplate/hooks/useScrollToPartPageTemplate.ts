import {useEffect, useState} from "react";

export const useScrollToPartPageTemplate = () => {
  // NOTICE: 使用 Javascript 方式替換純 CSS stikcy，因為 iOS sticky 會滾到一半就直接上去
  const [showFixForIOSStickTab, setShowFixForIOSStickTab] = useState(false);
  const [carouselHeight, setCarouselHeight] = useState(0);

  useEffect(() => {
    const pageContainer = document.getElementById("page-container");
    const getScrollY = () => pageContainer ? pageContainer.scrollTop : window.scrollY;

    const scroll = () => {

      // console.log("debug.scroll")
      // const targetContainer = pageContainer ? pageContainer : window;

      // console.log("debug.pageContainer", pageContainer)
      // console.log("debug.targetContainer", targetContainer)
      // console.log("debug.scrollY", scrollY)
      const carousel = document.getElementById("app-carousel");
      let carouselHeight = 0;

      if(carousel && carousel.offsetHeight) {
        carouselHeight = carousel.offsetHeight;
        // console.log("debug.carouselHeight", carouselHeight)
        // console.log("debug.scrollY", getScrollY())
        setCarouselHeight(carouselHeight);
      }
      if(getScrollY() > carouselHeight) {
        setShowFixForIOSStickTab(true)
      } else {
        setShowFixForIOSStickTab(false)
      }
    }

    if(pageContainer) {
      pageContainer.addEventListener("scroll", scroll);
    } else {
      window.addEventListener("scroll", scroll);
    }

    return () => {
      if(pageContainer) {
        pageContainer.removeEventListener("scroll", scroll);
      } else {
        window.removeEventListener("scroll", scroll);
      }

    }
  }, []);

  const scrollToCarousel = () => {
    const pageContainer = document.getElementById("page-container");
    const getScrollY = () => pageContainer ? pageContainer.scrollTop : window.scrollY;

    if(getScrollY() > carouselHeight) {
      const targetContainer = pageContainer ? pageContainer : window;
      targetContainer.scrollTo({ top: carouselHeight, behavior: "smooth" });
    }
  }

  const scrollToWindowTop = () => {
    const pageContainer = document.getElementById("page-container");
    const targetContainer = pageContainer ? pageContainer : window;
    targetContainer.scrollTo({ top: 0, behavior: "smooth"});
  }

  return {
    showFixForIOSStickTab,
    scrollToCarousel,
    scrollToWindowTop,
  }
}
