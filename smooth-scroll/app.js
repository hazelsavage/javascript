//Adapted (but only a little) from 'Vanilla JavaScript Smooth Scroll Tutorial' by DevEd:
//https://www.youtube.com/watch?v=oUSvlrDTLi4

const smoothScrollApp = () => {
  const smoothScroll = (target, duration) => {
    const scrollTarget = document.querySelector(target);
    const targetPosition = scrollTarget.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const easeRun = easeInOutQuad(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, easeRun);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    //Quadratic ease in/out: Parameters are:
    //timeElapsed t, startPosition b, distance c, duration d
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  //a function to pass the link starts and destinations to,
  //to save duplicating code each time we add a new link/destination pair
  const scrollFromTo = (startClass, destinationClass) => {
    const startLink = document.querySelector(startClass);
    const destinationLink = destinationClass;
    startLink.addEventListener("click", function () {
      smoothScroll(destinationLink, 1000);
    });
  };

  //call the function for each of the links and destinations on our page
  scrollFromTo(".section1-2", ".section2");
  scrollFromTo(".section2", ".section1-2");
  scrollFromTo(".section1-3", ".section3");
  scrollFromTo(".section3", ".section1-3");
};

smoothScrollApp();
