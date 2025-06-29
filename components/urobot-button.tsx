
import { useState } from "react";
import Urobot from "./Urobot";

export default function UrobotButton() {
  const [isOpen, setIsOpen] = useState(false);

  return <Urobot isOpen={isOpen} setIsOpen={setIsOpen} />;
}
