import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

interface Job {
  id: string;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
}

interface props {
  isHome: boolean;
}

const JobListings = ({ isHome = false }: props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiURL = isHome ? "/api/Jobs?_limit=3" : "/api/Jobs";
      try {
        const res = await fetch(apiURL);
        const data: Job[] = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobListings;
