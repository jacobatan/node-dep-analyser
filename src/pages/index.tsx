import type { NextPage } from "next";
import Head from "next/head";
import { SetStateAction, useState, Dispatch, useEffect } from "react";
import Accordion from "../components/Accordion";
export interface iData {
  _id?: any;
  _rev?: string;
  name?: any;
  description?: string;
  "dist-tags"?: any;
  versions?: any;
  readme?: string;
  maintainers?: any;
  time: { [key: string]: Date };
  author?: any;
  repository?: any;
  users?: { [key: string]: boolean };
  homepage?: string;
  keywords?: any;
  bugs?: any;
  readmeFilename?: string;
  license?: any;
}

const Home: NextPage = () => {
  const [yearFlag, setYearFlag] = useState<number>(5);
  const [value, setValue] = useState("");
  const [validJson, setValidJson] = useState(true);
  const [pkgNames, setPkgNames] = useState([""]);
  const [stuffs, setStuffs] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTheData = async () => {
      setLoading(true);
      const sumn = await Promise.all(
        pkgNames.map(async (pkgName) => {
          const res = await fetch(`https://registry.npmjs.org/${pkgName}`);
          const json: iData = await res.json();
          let time = new Date();
          time = Object.values(json.time).pop() as Date;
          const date = new Date(time).toISOString().slice(0, 10);
          const today = new Date().toISOString().slice(0, 10);
          const diffInMs = new Date(today).getTime() - new Date(date).getTime();
          const diffInYears = diffInMs / (1000 * 60 * 60 * 24 * 365);
          const outDated = diffInYears >= yearFlag;

          const template = { pkgName: pkgName, outDated: outDated };
          return template;
        })
      );
      await setStuffs(sumn);
      setLoading(false);
    };
    pkgNames[0] !== "" && getTheData();
  }, [pkgNames]);

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    let json;
    try {
      json = JSON.parse(value);
    } catch (e) {
      setValidJson(false);
      return;
    }
    setValidJson(true);
    const dep = json.dependencies;
    const devDep = json.devDependencies;
    const arr = Object.keys(devDep).concat(Object.keys(dep));
    setPkgNames(arr);
  };

  const handleYFChange = (e: { target: { value: SetStateAction<number> } }) => {
    setYearFlag(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Node dep analyser</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center min-h-screen p-4">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          <span className="text-purple-300">Node</span> Dependency Analyser
        </h1>
        <div className="flex justify-center w-full">
          <div className="mb-3 w-full">
            <label className="form-label inline-block mb-2 text-gray-700">
              Enter package.json
              {!validJson && (
                <p className="text-red-500">Not a valid json...</p>
              )}
            </label>
            <textarea
              value={value}
              onChange={handleChange}
              className="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                 "
              id="exampleFormControlTextarea1"
              placeholder="package.json"
            />
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  How many years?
                </label>
                <input
                  type="number"
                  className="
                    w-full
                    px-3
                    py-1.5
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                  onChange={() => handleYFChange}
                  value={yearFlag}
                />
              </div>
            </div>

            <div className="flex space-x-2 justify-center py-2">
              <button
                onClick={handleSubmit}
                type="button"
                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Go!
              </button>
            </div>
          </div>
        </div>

        {stuffs.length !== 0 ? (
          <Accordion stuffs={stuffs} />
        ) : (
          loading && <div>loading</div>
        )}
      </main>
    </>
  );
};

export default Home;
