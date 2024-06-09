import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import clsx from "clsx";

type Props = {
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
};

export default function ModelButton({ model, setModel }: Props) {
  const models = ["Basic Model", "MobileNet"];
  const [hidden, setHidden] = useState(true);

  return (
    <div className="absolute top-3 right-3 w-40 border border-black rounded-md cursor-pointer bg-white">
      <div
        className="flex justify-between items-center border border-black p-3 h-10"
        onClick={() => setHidden(!hidden)}
      >
        {model}
        <MenuIcon />
      </div>
      {models.map((model) => {
        return (
          <div
            className={clsx(
              "flex justify-between items-center border border-black p-3 h-10",
              { hidden: hidden == true }
            )}
            key={model}
            onClick={() => {
              setModel(model);
              setHidden(!hidden);
            }}
          >
            {model}
          </div>
        );
      })}
    </div>
  );
}
