

import * as Tooltip from "@radix-ui/react-tooltip";

import s from "./Tooltip.module.css";
import React, { ReactNode, useState } from "react";
import { IconInfo } from "../../assets/icons/infoIcon";

type Props = {
  children?: ReactNode;
};
export const TooltipDemo = ({ children }: Props) => {
  const [open, setOpen] = useState(false)



  return (

    <Tooltip.Provider>
      <Tooltip.Root onOpenChange={setOpen} open={open}>
        <Tooltip.Trigger asChild>
          <button className={s.iconButton}>
            <IconInfo/>
          </button>

        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className={s.tooltipContent}
            side={"right"}
            sideOffset={2}
          >
            {children}
            <Tooltip.Arrow className={s.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
