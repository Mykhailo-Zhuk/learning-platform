"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { useStore } from "@/store/store";
import Spinner from "../ui/spinner";
import NotionStyleTable from "./NotionStyleTable";

type Params = { params: string };

const ThemesContent = ({ params }: Params) => {
  const [loading, setLoading] = useState(true);
  const descriptions = useStore((state) => state.descriptions);
  const setDescriptions = useStore((state) => state.getDescriptions);

  useEffect(() => {
    const fetchData = async () => {
      await setDescriptions(params);
      setLoading(false);
    };
    fetchData();
  }, [setDescriptions, params]);

  let materials;

  if (loading) {
    materials = <Spinner />;
  } else {
    if (descriptions?.length !== 0) {
      materials = descriptions?.map((item, index) => {
        return (
          <Fragment key={index}>
            {item?.content?.map((subitem, index) => {
              if (typeof subitem === "string") {
                return (
                  <p key={index} className="text-2xl leading-10 font-spartan">
                    {subitem}
                  </p>
                );
              } else if (typeof subitem === "object") {
                if ("image" in subitem) {
                  return (
                    <div key={subitem.image?.src} className="flex flex-col space-y-2">
                      <div className="flex justify-center items-center">
                        <Image
                          src={subitem?.image?.src!}
                          alt={subitem?.image?.src!}
                          className="h-auto max-w-4xl"
                        />
                      </div>
                      {subitem?.image?.caption?.map((item, index) => {
                        return (
                          <p key={index} className="text-2xl leading-10 font-spartan">
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  );
                }

                if ("table" in subitem) {
                  return (
                    <NotionStyleTable
                      key={subitem?.table?.title?.replaceAll(" ", "")}
                      data={subitem?.table}
                    />
                  );
                }

                if ("list" in subitem) {
                  return (
                    <Fragment key={subitem?.list?.title?.replaceAll(" ", "")}>
                      <h1>
                        <b>{subitem?.list?.title}</b>
                      </h1>
                      <ol className="list-decimal list-inside">
                        {subitem?.list?.items?.map((item) => {
                          return (
                            <li
                              key={item?.id}
                              className="text-2xl text-justify leading-10 font-spartan mt-1">
                              {item?.item}
                            </li>
                          );
                        })}
                      </ol>
                    </Fragment>
                  );
                }
              }
            })}
          </Fragment>
        );
      });
    } else {
      materials = <h1 className="text-2xl text-center">По цій темі немає матеріалу</h1>;
    }
  }

  return <div className="flex flex-col space-y-5 w-full py-8">{materials}</div>;
};

export default ThemesContent;
