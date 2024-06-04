import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const search = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [relationship, setRelationship] = useState("");
  const [chooceType, setChooceType] = useState("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`/api/search/${search}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
        } else {
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchSearchResults();
  }, [search]);

  const handleSendSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/search/${search}`);
    const data = await res.json();
    setSearchResults(data);
  };

  const handleChangeType = () => {
    console.log(type);
    console.log(chooceType);
  };

  return (
    <>
      <div className="container px-4 mx-auto">
        <div className="md:flex justify-between">
          <div className="bg-gray-300 px-2 md:w-1/3">
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                Filter
              </h3>
            </div>
            <div className="pt-3 md:h-screen-60px-72px overflow-y-auto">
              <form onSubmit={handleSendSearch}>
                <div className="search-title_value">
                  <div className="">
                    <div className="flex gap-5 items-center">
                      <div>
                        <span>Type: </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setType("post");
                            handleChangeType();
                            setChooceType("post");
                          }}
                          className={`border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white px-3 hover:cursor-pointer ${
                            chooceType === "post"
                              ? "bg-emerald-700 text-white"
                              : ""
                          }`}
                        >
                          <span>Post</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setType("user");
                            handleChangeType();
                            setChooceType("user");
                          }}
                          className={`border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white px-3 hover:cursor-pointer ${
                            chooceType === "user"
                              ? "bg-emerald-700 text-white"
                              : ""
                          }`}
                        >
                          <span>User</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setType("all");
                            handleChangeType();
                            setChooceType("all");
                          }}
                          className={`border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white px-3 hover:cursor-pointer ${
                            chooceType === "all"
                              ? "bg-emerald-700 text-white"
                              : ""
                          }`}
                        >
                          <span>All</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center mt-5">
                      <div>
                        <span>Relationship: </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white px-3">
                          Friend
                        </button>
                        <button className="border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white px-3">
                          Not a friend
                        </button>
                        <button className="border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white px-3">
                          All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="w-full bg-emerald-700 text-white hover:bg-transparent hover:text-emerald-700 border-2 border-emerald-700 px-2 py-1 rounded-md"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="md:w-2/3 px-2">
            <div className="title py-3 border-b">
              <h3 className="text-xl font-semibold h-12 flex items-center justify-center">
                Results
              </h3>
            </div>
            <div className="md:h-screen-60px-72px overflow-y-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}
