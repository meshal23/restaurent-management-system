import { useState, useEffect, useRef } from "react";
import { animate, createScope, createSpring, createDraggable } from "animejs";

const AnimateDemo = () => {
  const root = useRef(null);
  const scope = useRef(null);
  const [rotations, setRotations] = useState(0);

  useEffect(() => {
    scope.current = createScope({ root }).add((self) => {
      // every animejs instances  declared here are scoped to <div ref={root}>
      //create bounce animation loop
      animate(".animate-text", {
        scale: [
          { to: 1.25, ease: "inOut(3)", duration: 200 },
          { to: 1, ease: createSpring({ stiffness: 300 }) },
        ],
        loop: true,
        loopDelay: 250,
      });
    });

    //properly cleanup all animejs instances declared inside the scope
    return () => scope.current.revert();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <h1 className="animate-text text-3xl font-bold">MESHAL</h1>
      </div>
    </div>
  );
};

export default AnimateDemo;
