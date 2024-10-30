import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage, {  jobLoader }   from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage.jsx";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import EditJobPage from "./pages/EditJobPage.jsx";
import { toast } from "react-toastify";


const App = () => {
//Add new JOb
  const addJob = async(newJob) => {
   const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newJob)
   })
   return
  }

  //Delete Job
  const deleteJob = async(jobId) => {
    const res = await fetch(`/api/jobs/${jobId}`, {
     method: 'DELETE',
    })
    if(!res.ok) {
      toast.error('Failed to delete job')
      throw new Error('Failed to delete job')
    }
    return
   }

   //edit job
   const editJob = async(job, id) => {
    const res = await fetch(`/api/jobs/${id}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(job)
    })
    if(!res.ok) {
      toast.error('Failed to update job')
      throw new Error('Failed to update job') 
    }
    return
   }
 
  
  const router = createBrowserRouter(
    
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/edit-job/:id' element={<EditJobPage editJobSubmit={editJob}/>} loader={jobLoader} />
        <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
// import { Route, RouterProvider } from "react-router-dom";
// import { createBrowserRouter } from "react-router-dom";

// const router = createBrowserRouter([{ path: "/", element: <HomePage /> }]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };
// (
//   <>
//     <Navbar />
//     <Hero />
//     <HomeCards />
//     <JobListings />
//     <ViewAllJobs />
//   </>
// );
