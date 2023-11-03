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
  }, []);

  let materials;

  if (loading) {
    materials = <Spinner />;
  } else {
    if (descriptions?.length !== 0) {
      materials = descriptions?.map((item) => {
        return (
          <Fragment key={item.id}>
            {item?.definition?.map((subitem, index) => {
              return (
                <p key={index} className="text-2xl leading-10 font-spartan">
                  {subitem}
                </p>
              );
            })}
            {item?.image ? (
              <div className="flex flex-col space-y-2">
                <div className="flex justify-center items-center">
                  <Image
                    src={item?.image?.url}
                    alt={item.url + "_image_" + item.id}
                    width={600}
                    height={400}
                    className="h-full w-auto"
                  />
                </div>
                {item?.image?.caption?.map((item, index) => {
                  return (
                    <p key={index} className="text-2xl leading-10 font-spartan">
                      {item}
                    </p>
                  );
                })}
              </div>
            ) : null}

            {item?.table ? <NotionStyleTable data={item?.table} /> : null}

            {item?.code?.map((subitem, index) => {
              return (
                <p key={index} className="text-2xl leading-10 font-spartan">
                  {subitem}
                </p>
              );
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
