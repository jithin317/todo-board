import React, { Fragment, useState } from "react";
import {
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
  motion,
} from "framer-motion";
import { AnimatedTooltip } from "../../utils/animated-tooltip";
import { CompleteIcon, ProgressIcon, WaitIcon } from "../../assets/icons/icons";
import ReviewContainer from "../../Components/review-container";
import Heading from "../Heading/Heading";
import { getTime } from "../getTime";

const token = JSON.parse(localStorage.getItem("token")) ?? null;

export default function TodoCard({ links = [], todos, handleClick }) {
  const [selectedId, setSelectedId] = useState(false);

  let delay = 0.2;
  let bgColor;

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <>
      <div className="review-container col-span-3 flex flex-col h-[20rem]">
        <Heading heading="Filters" HeadingSize="text-2xl" />
        <motion.div
          className="grid grid-cols-4 grid-rows-4 gap-4 h-full"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <ReviewContainer
            rowSpan=" row-span-full gap-3"
            backColor="bg-sky-200"
            Icon={<CompleteIcon />}
            sideIconClass={"bottom-4"}
            Text="Done"
            onclkFn={handleClick}
          />
          <ReviewContainer
            rowSpan="row-span-2 gap-2"
            backColor="bg-amber-200"
            Icon={<ProgressIcon />}
            sideIconClass={"bottom-3"}
            Text="In Progress"
            onclkFn={handleClick}
          />
          <ReviewContainer
            rowSpan="row-span-2 gap-2"
            backColor="bg-rose-200"
            Icon={<WaitIcon />}
            sideIconClass={"bottom-3"}
            Text="Waiting"
            onclkFn={handleClick}
          />
        </motion.div>
      </div>
      {todos.map((ele) => {
        delay += 0.2;
        if (ele.status.toLowerCase() === "done") {
          bgColor = "bg-sky-200";
        } else if (ele.status.toLowerCase() === "in progress") {
          bgColor = "bg-amber-200";
        } else {
          bgColor = "bg-rose-200";
        }
        return (
          <Fragment key={ele._id}>
            <LayoutGroup>
              <div className="col-span-3 p-5">
                <motion.div
                  className={`${bgColor} flex flex-col justify-between p-4 border rounded-2xl cursor-pointer border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[20rem] h-[18rem] relative overflow-hidden`}
                  variants={item}
                  viewport={{ once: true }}
                  initial="hidden"
                  whileInView="visible"
                  layoutId={ele._id}
                  onClick={() => setSelectedId(ele._id)}
                >
                  <div className="text-5xl font-bold darkColor">{ele.desc}</div>
                  <div className="flex justify-between">
                    <div className="flex">
                      <AnimatedTooltip items={links} />
                    </div>
                    <p className="text-slate-600 text-sm">
                      {ele.createdAt === ele.updatedAt ? `Added` : `Updated`}{" "}
                      {getTime(ele.updatedAt)} ago
                    </p>
                  </div>
                  <div className="absolute top-[20%] -right-[10%] rounded-[50%] blur-[2px] p-2 bg-slate-50 rotate-12 opacity-20">
                    {ele.status.toLowerCase() === "done" && (
                      <CompleteIcon
                        width="150"
                        height="150"
                        fill="bg-sky-200"
                      />
                    )}
                    {ele.status.toLowerCase() === "in progress" && (
                      <ProgressIcon
                        width="150"
                        height="150"
                        fill="bg-amber-200"
                      />
                    )}
                    {ele.status.toLowerCase() === "waiting" && (
                      <WaitIcon width="150" height="150" fill="bg-rose-200" />
                    )}
                  </div>
                </motion.div>
              </div>
              <AnimatePresence>
                {selectedId && (
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                  >
                    {todos.map(
                      (item) =>
                        item._id === selectedId && (
                          <motion.div
                            className={`${bgColor} flex flex-col justify-between p-4 border rounded-2xl cursor-pointer border-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[20rem] h-[18rem] relative overflow-hidden`}
                            layoutId={item._id}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                          >
                            <div className="text-5xl font-bold darkColor">
                              {item.desc}
                            </div>
                            <div className="flex justify-between">
                              <div className="flex">
                                <AnimatedTooltip items={links} />
                              </div>
                              <p className="text-slate-600 text-sm">
                                {item.createdAt === item.updatedAt
                                  ? `Added`
                                  : `Updated`}{" "}
                                {getTime(item.updatedAt)} ago
                              </p>
                            </div>
                            <div className="absolute top-[20%] -right-[10%] rounded-[50%] blur-[2px] p-2 bg-slate-50 rotate-12 opacity-20">
                              {item.status.toLowerCase() === "done" && (
                                <CompleteIcon
                                  width="150"
                                  height="150"
                                  fill="bg-sky-200"
                                />
                              )}
                              {item.status.toLowerCase() === "in progress" && (
                                <ProgressIcon
                                  width="150"
                                  height="150"
                                  fill="bg-amber-200"
                                />
                              )}
                              {item.status.toLowerCase() === "waiting" && (
                                <WaitIcon
                                  width="150"
                                  height="150"
                                  fill="bg-rose-200"
                                />
                              )}
                            </div>
                          </motion.div>
                        )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </LayoutGroup>
          </Fragment>
        );
      })}
    </>
  );
}
