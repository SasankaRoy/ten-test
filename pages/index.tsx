"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios-interceptor";
import CircularProgress from "@mui/material/CircularProgress";
import { Footer } from "@/components/common/Footer/Footer";
import { Navbar } from "@/components/common/Navbar/Navbar";
import { NewEntry } from "@/components/common/Models/NewEntry/NewEntry";

type Status = "COMPLETED" | "INCOMPLETE" | "MISSING";

const allTimesheets: { week: number; date: string; status: Status }[] = [
  { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },
  { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },
  { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },
  { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },
  { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },
  { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },
  { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },

  // add more mock data if needed
];

const statusColors = (totalHours: number) => {
  if (totalHours >= 40) {
    return { class: "bg-green-100 text-green-700", label: "COMPLETED" };
  } else if (totalHours >= 30) {
    return { class: "bg-yellow-100 text-yellow-700", label: "INCOMPLETE" };
  } else if (totalHours <= 20) {
    return { class: "bg-pink-100 text-pink-700", label: "MISSING" };
  }
  return { class: "bg-pink-100 text-pink-700", label: "MISSING" };
};

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [newEntry, setNewEntry] = useState(false);
  const getTimeSheet = async () => {
    try {
      const timeSheets = await axiosInstance.post("/get-timesheet", {
        page: currentPage,
        limit: perPage,
      });

      return timeSheets.data;
    } catch (error: any) {
      console.log("Error fetching timesheets:", error);
      throw Error(error || "Error fetching timesheets");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get_timesheets", currentPage, perPage],
    queryFn: getTimeSheet,
  });

  const totalPages = data ? data.totalPages : 1;

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  return (
    <>
      <Head>
        <title>Timesheet Dashboard</title>
      </Head>
      {isLoading ? (
        <>
          <div className="fixed h-screen w-full backdrop-blur-md bg-white/60 flex justify-center items-center">
            <div className="flex justify-center items-center gap-6">
              <CircularProgress /> <p>Loading ...</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {isError ? (
            <>
              <div className="fixed h-screen w-full backdrop-blur-md bg-white/60 flex justify-center items-center">
                <div className="flex justify-center items-center gap-6">
                  <p>Something went wrong. Please Login again ...</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <Navbar />
              <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <main className="2xl:w-[80%] xl:w-[80%] lg:w-[80%] lg:portrait:w-[90%] md:w-[90%] w-[95%]  mx-auto p-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="2xl:text-[2dvw] xl:text-[2dvw] lg:text-[2dvw] md:text-[3dvw] text-[5dvw] font-bold mb-4">
                      Your Timesheets
                    </h2>

                    {/* Filters */}
                    <div className="flex gap-3 mb-4">
                      <select className="border rounded-lg px-3 py-2 text-[#6B7280] border-(--border-color) 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[2dvw] text-[3.5dvw] ">
                        <option>Date Range</option>
                      </select>
                      <select className="border rounded-lg px-3 py-2 text-[#6B7280] border-(--border-color) 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[2dvw] text-[3.5dvw] ">
                        <option>Status</option>
                      </select>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto my-8">
                      <table className="min-w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-[#E5E7EB] border-b text-left text-[#6B7280] bg-[#F9FAFB]">
                            <th className="py-4 px-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3dvw] font-semibold">
                              WEEK #
                            </th>
                            <th className="py-4 px-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3dvw] font-semibold">
                              DATE
                            </th>
                            <th className="py-4 px-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3dvw] font-semibold">
                              STATUS
                            </th>
                            <th className="py-4 px-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3dvw] font-semibold text-right">
                              ACTIONS
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.timesheets?.map(
                            (row: {
                              week: number;
                              id: number;
                              entries: [];
                              totalHours: number;
                            }) => (
                              <tr
                                key={row.id}
                                className="border-[#E5E7EB] border-b"
                              >
                                <td className="py-4 px-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3.3dvw] bg-[#F9FAFB] text-[#111928]">
                                  {row.id}
                                </td>
                                <td className="py-4 px-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3.3dvw] text-[#6B7280] font-medium">
                                  {row.week}
                                </td>
                                <td className="py-4 px-4 2xl:text-[.9dvw] xl:text-[.9dvw] lg:text-[.9dvw] md:text-[1.5dvw] text-[3.3dvw] text-[#6B7280] font-medium">
                                  <span
                                    className={`px-4 py-1 rounded-full  font-medium ${
                                      statusColors(row.totalHours).class
                                    }`}
                                  >
                                    {statusColors(row.totalHours).label}
                                  </span>
                                </td>
                                <td className="py-4 2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3.3dvw] px-4 text-right text-blue-600 cursor-pointer">
                                  {statusColors(row.totalHours).label ===
                                  "MISSING" ? (
                                    <button
                                      className="cursor-pointer"
                                      onClick={() => {
                                        setNewEntry(true);
                                      }}
                                    >
                                      Create
                                    </button>
                                  ) : statusColors(row.totalHours).label ===
                                    "INCOMPLETE" ? (
                                    "Update"
                                  ) : (
                                    "View"
                                  )}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 py-4">
                      <div className="2xl:text-[1dvw] xl:text-[1dvw] lg:text-[1dvw] md:text-[1.8dvw] text-[3.3dvw] text-[#6B7280] font-medium">
                        <select
                          onChange={(e) => {
                            setPerPage(Number(e.target.value));
                          }}
                          className="border border-(--border-color) rounded-md px-2 py-1"
                        >
                          <option value={5} defaultValue={5}>
                            5 per page
                          </option>
                          <option value={10}>10 per page</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePrev}
                          disabled={currentPage === 1}
                          className="p-2 rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        {Array.from({ length: data?.totalPages }, (_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-md border text-sm ${
                              currentPage === i + 1
                                ? "bg-blue-500 text-white border-blue-500"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button
                          onClick={handleNext}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-md border text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Footer />
                </main>
              </div>
            </>
          )}
          {newEntry && <NewEntry setNewEntry={setNewEntry} />}
        </>
      )}
    </>
  );
}
