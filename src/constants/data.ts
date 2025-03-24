export const frames = {
  currentIndex: 0,
  maxIndex: 105,
};

export const textMapping: {
  [key: number]: { title: string; subtitle: string; text?: string };
} = {
  0: {
    title: "",
    subtitle: "",
  },
  6: {
    title: "BRAKE DISCS",
    subtitle: "Brakes that Stop the Bike, but free your mind",
  },
  20: {
    title: "RADIAL TUBELESS TYRES",
    subtitle: "Smoother Rides, Improved Traction, Better High Speed Handling",
  },
  40: {
    title: "DUAL CHANNEL ABS",
    subtitle: "Ready for any roads, even no roads",
  },
  54: {
    title: "IP67",
    subtitle: "Tested and Sealed for Life",
    text: "No matter what, IP67 protection keeps the tiniest speak of dust, water and your biggest worries at bay. Tested and sealed for life, so you can ride without a care!",
  },
  70: {
    title: "BATTERY MANAGEMENT SYSTEM",
    subtitle: "Always on Monitoring - Reimagined",
  },
  83: {
    title: "POWER DISTRIBUTION SYSTEM",
    subtitle: "Precision power, perfectly distributed",
  },
  92: {
    title: "",
    subtitle: "",
  },
};


export const animationMapping: { [key: number]: gsap.TweenVars } = {
    6: { opacity: 0, duration: 0.8, ease: "power2.out"}, 
    20: { opacity: 0, duration: 0.8, ease: "power3.out", delay:1 },
    40: { y:10, x:-10, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, 
    54: { x:20, opacity: 0, duration: 0.3, ease: "expo.out" },
    70: { x: 10, opacity: 0, duration: 0.5, ease: "power1.out" }, 
    83: { x: -10, opacity: 0, duration: 0.4, ease: "power2.out" }, 
  };
