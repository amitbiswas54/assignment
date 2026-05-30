import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolicies } from "../features/itemsSlice";
import { Link, Links } from "react-router-dom";

function Cards() {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.app);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;

  const currentCards = items.slice(firstCardIndex, lastCardIndex);

  const totalPages = Math.ceil(items.length / cardsPerPage);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
        {currentCards.map((policy) => (
          <div
            key={policy.id}
            className="bg-white rounded-3xl p-6 md:p-8 mb-8 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-700">
                  Policy number:
                  <span className="text-gray-900 font-normal ml-2">
                    {policy.policyNumber}
                  </span>
                </h2>

                <div className="mt-8 flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <p>
                      <span className="font-bold me-2">Destination:</span>{" "}
                      {policy.destinations?.[0]?.name || "N/A"}
                    </p>

                    <>
                      <p>
                        <span className="font-bold me-2">
                          Policy start date:
                        </span>
                        {policy.policyStart}
                      </p>

                      <p>
                        <span className="font-bold me-2">
                          Maximum trip duration:
                        </span>
                        {policy.maxTripDuration ?? "N/A"}
                      </p>
                    </>
                  </div>

                  <div className="hidden md:block w-px bg-gray-300"></div>

                  <div className="flex-1 space-y-4">
                    <p>
                      <span className="font-bold">Plan:</span>{" "}
                      {policy.planName ? policy.planName : "N/A"}
                    </p>

                    <p>
                      <span className="font-bold">Excess:</span> {policy.excess}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="mt-8 flex flex-wrap gap-6 f">
                  <a
                    href="#"
                    className="font-semibold text-gray-600 text-[0.8rem]  cursor-pointer
                  transition-all
                  duration-300 hover:text-blue-700 underline"
                  >
                    📄 View PDS
                  </a>

                  <a
                    href="#"
                    className=" font-semibold text-gray-600 text-[0.8rem]  cursor-pointer
                  transition-all
                  duration-300 hover:text-blue-700 underline
                 "
                  >
                    📄 Certificate of Insurance
                  </a>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 lg:w-44">
                <button
                  className="
                 h-12
                  rounded-full
                  bg-yellow-200
                  border-2
                  border-blue-700
                  text-blue-700
                  font-semibold
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:bg-yellow-300
                  hover:scale-105
                  hover:shadow-md
              "
                >
                  Make a claim
                </button>

                <button
                  className="
               h-12
                  rounded-full
                  border-2
                  border-blue-700
                  bg-white
                  text-blue-700
                  font-semibold
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:bg-blue-700
                  hover:text-white
                  hover:scale-105
                  hover:shadow-md
              "
                >
                  Manage my policy
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 font-semibold  rounded cursor-pointer transition-colors duration-300 hover:bg-gray-100 disabled:opacity-50    "
          >
            ‹
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-9 h-9 rounded-full cursor-pointer ${
                currentPage === index + 1 ? "bg-blue-700 text-white" : "border"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1  font-semibold  rounded cursor-pointer transition-colors duration-300 hover:bg-gray-100 disabled:opacity-50 "
          >
            ›
          </button>
        </div>
      </div>
    </>
  );
}

export default Cards;
