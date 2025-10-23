import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "./auth/session";

let mockTimesheets = [
  {
    id: 1,
    week: "2025-10-20",
    entries: [
      { day: "Monday", hours: 8, project: "Website Revamp" },
      { day: "Tuesday", hours: 7, project: "Website Revamp" },
      { day: "Wednesday", hours: 6, project: "Internal Dashboard" },
      { day: "Thursday", hours: 8, project: "Internal Dashboard" },
      { day: "Friday", hours: 5, project: "UI Cleanup" },
    ],
    totalHours: 34,
  },
  {
    id: 2,
    week: "2025-10-13",
    entries: [
      { day: "Monday", hours: 8, project: "API Gateway" },
      { day: "Tuesday", hours: 8, project: "API Gateway" },
      { day: "Wednesday", hours: 8, project: "Mobile App" },
      { day: "Thursday", hours: 8, project: "Mobile App" },
      { day: "Friday", hours: 8, project: "Documentation" },
    ],
    totalHours: 40,
  },
  {
    id: 3,
    week: "2025-10-06",
    entries: [
      { day: "Monday", hours: 8, project: "Dashboard UI" },
      { day: "Tuesday", hours: 8, project: "Dashboard UI" },
      { day: "Wednesday", hours: 8, project: "Dashboard UI" },
      { day: "Thursday", hours: 7, project: "Testing" },
      { day: "Friday", hours: 6, project: "Testing" },
    ],
    totalHours: 37,
  },
  {
    id: 4,
    week: "2025-09-29",
    entries: [
      { day: "Monday", hours: 4, project: "Landing Page" },
      { day: "Tuesday", hours: 4, project: "Landing Page" },
      { day: "Wednesday", hours: 4, project: "UI Fixes" },
      { day: "Thursday", hours: 2, project: "UI Fixes" },
      { day: "Friday", hours: 2, project: "Code Review" },
    ],
    totalHours: 16,
  },
  {
    id: 5,
    week: "2025-09-22",
    entries: [
      { day: "Monday", hours: 8, project: "E-commerce" },
      { day: "Tuesday", hours: 7, project: "E-commerce" },
      { day: "Wednesday", hours: 7, project: "E-commerce" },
      { day: "Thursday", hours: 8, project: "Cart System" },
      { day: "Friday", hours: 6, project: "Cart System" },
    ],
    totalHours: 36,
  },
  {
    id: 6,
    week: "2025-09-15",
    entries: [
      { day: "Monday", hours: 8, project: "Chat App" },
      { day: "Tuesday", hours: 8, project: "Chat App" },
      { day: "Wednesday", hours: 8, project: "Chat App" },
      { day: "Thursday", hours: 7, project: "Bug Fixes" },
      { day: "Friday", hours: 6, project: "Deployment" },
    ],
    totalHours: 37,
  },
  {
    id: 7,
    week: "2025-09-08",
    entries: [
      { day: "Monday", hours: 8, project: "Portfolio" },
      { day: "Tuesday", hours: 7, project: "Portfolio" },
      { day: "Wednesday", hours: 7, project: "Portfolio" },
      { day: "Thursday", hours: 8, project: "Animations" },
      { day: "Friday", hours: 5, project: "Testing" },
    ],
    totalHours: 35,
  },
  {
    id: 8,
    week: "2025-09-01",
    entries: [
      { day: "Monday", hours: 8, project: "Admin Panel" },
      { day: "Tuesday", hours: 8, project: "Admin Panel" },
      { day: "Wednesday", hours: 8, project: "Admin Panel" },
      { day: "Thursday", hours: 6, project: "Optimization" },
      { day: "Friday", hours: 5, project: "Documentation" },
    ],
    totalHours: 35,
  },
  {
    id: 9,
    week: "2025-08-25",
    entries: [
      { day: "Monday", hours: 8, project: "CRM System" },
      { day: "Tuesday", hours: 7, project: "CRM System" },
      { day: "Wednesday", hours: 8, project: "CRM System" },
      { day: "Thursday", hours: 7, project: "Testing" },
      { day: "Friday", hours: 5, project: "Meetings" },
    ],
    totalHours: 35,
  },
  {
    id: 10,
    week: "2025-08-18",
    entries: [
      { day: "Monday", hours: 8, project: "Analytics Dashboard" },
      { day: "Tuesday", hours: 8, project: "Analytics Dashboard" },
      { day: "Wednesday", hours: 8, project: "Charts" },
      { day: "Thursday", hours: 7, project: "Charts" },
      { day: "Friday", hours: 6, project: "Bug Fixes" },
    ],
    totalHours: 37,
  },
  {
    id: 11,
    week: "2025-08-11",
    entries: [
      { day: "Monday", hours: 8, project: "CMS Platform" },
      { day: "Tuesday", hours: 8, project: "CMS Platform" },
      { day: "Wednesday", hours: 7, project: "CMS Platform" },
      { day: "Thursday", hours: 8, project: "CMS Platform" },
      { day: "Friday", hours: 6, project: "UI Cleanup" },
    ],
    totalHours: 37,
  },
  {
    id: 12,
    week: "2025-08-04",
    entries: [
      { day: "Monday", hours: 8, project: "Blog System" },
      { day: "Tuesday", hours: 7, project: "Blog System" },
      { day: "Wednesday", hours: 8, project: "Blog System" },
      { day: "Thursday", hours: 7, project: "SEO" },
      { day: "Friday", hours: 5, project: "SEO" },
    ],
    totalHours: 35,
  },
  {
    id: 13,
    week: "2025-07-28",
    entries: [
      { day: "Monday", hours: 8, project: "Video Platform" },
      { day: "Tuesday", hours: 8, project: "Video Platform" },
      { day: "Wednesday", hours: 7, project: "Video Platform" },
      { day: "Thursday", hours: 7, project: "Bug Fixes" },
      { day: "Friday", hours: 5, project: "Testing" },
    ],
    totalHours: 35,
  },
  {
    id: 14,
    week: "2025-07-21",
    entries: [
      { day: "Monday", hours: 8, project: "AI Assistant" },
      { day: "Tuesday", hours: 7, project: "AI Assistant" },
      { day: "Wednesday", hours: 8, project: "AI Assistant" },
      { day: "Thursday", hours: 8, project: "API Integration" },
      { day: "Friday", hours: 5, project: "UI Review" },
    ],
    totalHours: 36,
  },
  {
    id: 15,
    week: "2025-07-14",
    entries: [
      { day: "Monday", hours: 8, project: "Social Media App" },
      { day: "Tuesday", hours: 8, project: "Social Media App" },
      { day: "Wednesday", hours: 8, project: "Social Media App" },
      { day: "Thursday", hours: 7, project: "Testing" },
      { day: "Friday", hours: 6, project: "Deployment" },
    ],
    totalHours: 37,
  },
  {
    id: 16,
    week: "2025-07-07",
    entries: [
      { day: "Monday", hours: 8, project: "ERP Module" },
      { day: "Tuesday", hours: 8, project: "ERP Module" },
      { day: "Wednesday", hours: 7, project: "ERP Module" },
      { day: "Thursday", hours: 7, project: "ERP Module" },
      { day: "Friday", hours: 5, project: "Code Review" },
    ],
    totalHours: 35,
  },
  {
    id: 17,
    week: "2025-06-30",
    entries: [
      { day: "Monday", hours: 8, project: "Chatbot UI" },
      { day: "Tuesday", hours: 8, project: "Chatbot UI" },
      { day: "Wednesday", hours: 8, project: "Chatbot UI" },
      { day: "Thursday", hours: 6, project: "Testing" },
      { day: "Friday", hours: 5, project: "Bug Fixes" },
    ],
    totalHours: 35,
  },
  {
    id: 18,
    week: "2025-06-23",
    entries: [
      { day: "Monday", hours: 8, project: "Booking System" },
      { day: "Tuesday", hours: 8, project: "Booking System" },
      { day: "Wednesday", hours: 8, project: "Booking System" },
      { day: "Thursday", hours: 7, project: "Testing" },
      { day: "Friday", hours: 5, project: "Deployment" },
    ],
    totalHours: 36,
  },
  {
    id: 19,
    week: "2025-06-16",
    entries: [
      { day: "Monday", hours: 8, project: "HR Portal" },
      { day: "Tuesday", hours: 8, project: "HR Portal" },
      { day: "Wednesday", hours: 8, project: "HR Portal" },
      { day: "Thursday", hours: 8, project: "HR Portal" },
      { day: "Friday", hours: 4, project: "Meetings" },
    ],
    totalHours: 36,
  },
  {
    id: 20,
    week: "2025-06-09",
    entries: [
      { day: "Monday", hours: 8, project: "Payment Gateway" },
      { day: "Tuesday", hours: 8, project: "Payment Gateway" },
      { day: "Wednesday", hours: 8, project: "Payment Gateway" },
      { day: "Thursday", hours: 7, project: "Testing" },
      { day: "Friday", hours: 5, project: "Support" },
    ],
    totalHours: 36,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const GetTimesheet = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ message: "Method not allowed", status: "Error" });
    }
    await delay(1000);

    const { email, role } = await Session(req, res);
    console.log("Session validated for timesheet fetch:", email, role);
    if (!email && !role) {
      return res
        .status(403)
        .json({ message: "Un-authenticated", status: "Error" });
    }


    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = mockTimesheets.slice(startIndex, endIndex);

    const totalPages = Math.ceil(mockTimesheets.length / limit);

    return res.status(200).json({
      timesheets: paginated,
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: "Error" });
  }
};

export default GetTimesheet;
