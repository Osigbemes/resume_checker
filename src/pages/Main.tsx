import { useState, useEffect } from "react";
import { Button } from "../partials/Button"
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";
function Main() {
  const [announcement, setAnnouncement] = useState(true);
  return (
    <div>
      {
        announcement === true ?
          <div className="bg-red-900 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div data-aos="fade-right" className="mr-1">
                  <Button
                    loadingText={"Processing"}
                    // loading={loading} 
                    text={"New!"}
                    btnType={"tertiary"}
                  />
                </div>
                <div className="-mr-2">
                  <h1 className="md:text-3xl text-base font-semibold text-white text-center"></h1>
                </div>
                <div className="grid grid-cols-2 gap-8 mb-4">
                  <div className="col-span-1">
                  </div>
                  <div className="col-span-1">
                    <div>
                      <img onClick={() => setAnnouncement(false)} alt="" className=" duration-900 animate-bounce cursor-pointer md:w-2/5 mt-6 inline transition duration-900 ease-in-out " src="./img/cancel.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : ""
      }
    </div>
  );
}
export default Main;