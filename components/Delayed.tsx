import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  resultOpacityHandler: (opacity: number) => void;
  waitBeforeShow?: number;
};

const Delayed = ({
  children,
  resultOpacityHandler,
  waitBeforeShow = 500,
}: Props) => {
  const [renderElement, setRenderElement] = useState(false);

  useEffect(() => {
    resultOpacityHandler(0);

    const renderTimeout = setTimeout(() => {
      setRenderElement(true);
      setTimeout(() => {
        resultOpacityHandler(100);
      }, 500);
    }, waitBeforeShow);

    return () => clearTimeout(renderTimeout);
  }, [waitBeforeShow]);

  return renderElement ? children : null;
};

export default Delayed;
