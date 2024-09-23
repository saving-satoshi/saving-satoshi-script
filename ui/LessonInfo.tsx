import clsx from "clsx";
import { LessonDirection, LessonView } from "types";
import { useLessonContext } from "ui";

export default function LessonInfo({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  const { activeView, direction } = useLessonContext();
  const isActive = activeView === LessonView.Info;

  if (direction === LessonDirection.Horizontal && isActive) {
    return (
      <div className="max-w-full grow justify-center overflow-y-auto text-white md:max-w-[50%] md:basis-1/3">
        <div
          className={clsx(
            "flex flex-col content-center gap-1 overflow-y-auto px-1 py-6 sm:px-12",
            className
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex w-full max-w-[840px] grow flex-col items-start gap-1 overflow-y-auto px-4 py-6 font-nunito text-white",
        {
          "hidden md:flex": !isActive,
          flex: isActive,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
