import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
// import JobPage, { jobLoader } from "./pages/JobPage";

interface Job {
  [x: string]: any;
  title: string;
  type: string;
  location: string;
  description: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

const App = () => {
  const addJob = async (newJob: Job) => {
    // Add Job
    const res = await fetch("/api/Jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });
    console.log(res);
    return;
  };

  // Delete JOb

  const deleteJob = async (id: string) => {
    const res = await fetch(`/api/Jobs/${id}`, {
      method: "DELETE",
    });
    console.log(res);
    return;
  };

  //Update Job
  const updateJob = async (job: Job) => {
    const res = await fetch(`/api/Jobs/${job.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    console.log(res);
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        {/* <Route path="/jobs/:id" element={<JobPage />} loader={jobLoader}/> */}
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
